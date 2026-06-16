import { useState, useMemo, useRef, useCallback } from 'react';
import { useCalendarMonths, useAvailability, type CalendarMonth } from '@/hooks/useCalendarData';
import { Calendar, Loader2, XCircle, ArrowRight, Lock, Flame, CalendarDays, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const useDragScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp };
};

const RentalCalendar = () => {
  const { months: allMonths, settings, loading: monthsLoading, error: monthsError } = useCalendarMonths();
  const [visibleCount, setVisibleCount] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } = useDragScroll();

  // Set initial visibleCount once settings load
  const effectiveVisibleCount = visibleCount ?? settings?.initialVisible ?? allMonths.length;

  const visibleMonths = useMemo(
    () => allMonths.slice(0, effectiveVisibleCount),
    [allMonths, effectiveVisibleCount]
  );

  const selectedMonth: CalendarMonth | null = visibleMonths[selectedIndex] ?? null;

  const { blocks, loading: blocksLoading, error: blocksError } = useAvailability(
    selectedMonth?.year ?? null,
    selectedMonth?.month ?? null
  );

  // Determine current year to decide whether to show year in tab label
  const currentYear = new Date().getFullYear();

  const canShowMore = settings
    ? effectiveVisibleCount < settings.totalAvailable && effectiveVisibleCount < allMonths.length
    : false;

  const nextHiddenYear = canShowMore ? allMonths[effectiveVisibleCount]?.year : null;

  // Prüfen, welcher Buchungsmodus in den Settings aktiv ist
  const isSingleDays = settings?.bookingMode === 'SINGLE_DAYS';

  if (monthsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-accent-primary" />
        <span className="ml-2 text-lg">Verfügbarkeit wird geladen...</span>
      </div>
    );
  }

  if (monthsError) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
        <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <p className="text-white font-semibold text-lg mb-2">
          Die Verfügbarkeit konnte leider nicht geladen werden.
        </p>
        <p className="text-gray-300 text-sm">
          Bitte versuche es später erneut oder kontaktiere uns direkt.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <Calendar className="h-7 w-7 text-accent-primary" />
        <h2 className="text-3xl font-bold text-white">Verfügbarkeit</h2>
      </div>
      <div className="max-w-3xl mx-auto text-center mb-12 space-y-6">
        <p className="text-gray-300">
          Unsere Location ist von Januar bis Mai sowie von September bis November jeweils freitags oder samstags buchbar.
          Unten siehst du unsere freien Wochenenden.
          Wähle einfach direkt den gewünschten Freitag oder Samstag über den jeweiligen Button aus.
        </p>
        <p className="text-sm text-gray-400 italic border-t border-gray-800 pt-4 mx-auto max-w-2xl">
          <span className="font-semibold text-gray-300">Hinweis:</span> Da jede Vermietung für uns mit erheblichem organisatorischem Aufwand einhergeht, können wir als „verfügbar" angezeigte Termine nicht immer garantieren. Die endgültige Zu- oder Absage schicken wir dir nach deiner Anfrage zeitnah per E-Mail.
        </p>
      </div>

      {/* Month Tabs */}
      <div
        className="mb-10 overflow-x-auto py-2 cursor-grab active:cursor-grabbing calendar-scrollbar"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex gap-3 px-2 w-max mx-auto">
          {visibleMonths.map((m, i) => {
            const isActive = i === selectedIndex;
            const showYear = m.year !== currentYear;
            return (
              <button
                key={`${m.year}-${m.month}`}
                onClick={() => setSelectedIndex(i)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-accent-primary text-white border-accent-primary shadow-[0_0_10px_hsl(var(--accent-primary)/0.5)]'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border-gray-700'
                }`}
              >
                {m.label}{showYear ? ` ${m.year}` : ''}
              </button>
            );
          })}

          {/* "+" Button */}
          {canShowMore && (
            <button
              onClick={() => setVisibleCount((effectiveVisibleCount) + 1)}
              className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 text-accent-primary border border-accent-primary/30 hover:border-accent-primary transition-all flex items-center justify-center flex-shrink-0"
              title={`${nextHiddenYear} anzeigen`}
            >
              <Plus className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {blocksLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 h-60 animate-pulse"
            >
              <div className="h-4 bg-gray-800 rounded w-1/3 mb-4" />
              <div className="h-6 bg-gray-800 rounded w-2/3 mb-2" />
              <div className="h-4 bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : blocksError ? (
        <div className="text-center text-red-400 py-8">
          <p>Fehler beim Laden: {blocksError}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block) => {
            const isFrei = block.status === 'FREI';
            const hasEvent = block.specialEvent !== null;

            if (isFrei) {
              return (
                <div
                  key={block.id}
                  className={`group bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg hover:shadow-2xl hover:border-accent-primary/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isSingleDays && !hasEvent ? '' : 'h-60'
                  } ${hasEvent ? 'ring-1 ring-accent-primary/20' : ''}`}
                >
                  {/* Header row: label (single) or badge */}
                  {isSingleDays && !hasEvent ? (
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white group-hover:text-accent-primary transition-colors">
                        {block.label}
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-cyan-900/20 text-accent-secondary border border-accent-secondary/30 shadow-[0_0_10px_hsl(var(--accent-secondary)/0.5)]">
                        <span className="w-2 h-2 rounded-full bg-accent-secondary mr-2 animate-pulse shadow-[0_0_8px_hsl(var(--accent-secondary))]" />
                        FREI
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-cyan-900/20 text-accent-secondary border border-accent-secondary/30 shadow-[0_0_10px_hsl(var(--accent-secondary)/0.5)]">
                          <span className="w-2 h-2 rounded-full bg-accent-secondary mr-2 animate-pulse shadow-[0_0_8px_hsl(var(--accent-secondary))]" />
                          FREI
                        </span>
                      </div>
                      <div className="mt-2">
                        {hasEvent ? (
                          <h3 className="text-sm font-medium text-accent-primary uppercase tracking-widest mb-2 flex items-center gap-1">
                            <Flame className="h-3.5 w-3.5" /> {block.specialEvent}
                          </h3>
                        ) : (
                          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">
                            Wochenende
                          </h3>
                        )}
                        <div className="text-2xl font-bold text-white group-hover:text-accent-primary transition-colors mb-2">
                          {block.label}
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{block.subLabel}</p>
                      </div>
                    </>
                  )}

                  {/* CTA Button */}
                  <div className={isSingleDays && !hasEvent ? 'mt-4' : 'mt-6'}>
                    <Link
                      to="/kontakt"
                      className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                        hasEvent
                          ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/30 hover:shadow-accent-primary/50 hover:scale-[1.02]'
                          : 'bg-gray-800 border border-gray-700 text-white hover:bg-accent-primary hover:border-accent-primary group-hover:shadow-lg'
                      }`}
                    >
                      Jetzt Anfragen
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            }

            // GEBUCHT card
            return (
              <div
                key={block.id}
                className={`bg-gray-900/60 rounded-2xl p-6 border border-gray-800/50 relative overflow-hidden flex flex-col justify-between ${
                  isSingleDays ? '' : 'h-60'
                } opacity-80`}
              >
                {isSingleDays ? (
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-500 line-through decoration-gray-600 decoration-2">
                      {block.label}
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-gray-800 text-gray-400 border border-gray-700">
                      GEBUCHT
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-gray-800 text-gray-400 border border-gray-700">
                        GEBUCHT
                      </span>
                    </div>
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">
                        Wochenende
                      </h3>
                      <div className="text-2xl font-bold text-gray-500 line-through decoration-gray-600 decoration-2 mb-2">
                        {block.label}
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{block.subLabel}</p>
                    </div>
                  </>
                )}

                <div className={isSingleDays ? 'mt-4' : 'mt-6'}>
                  <button
                    disabled
                    className="w-full py-3 rounded-lg bg-transparent border border-gray-800 text-gray-600 font-medium cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Bereits vergeben
                  </button>
                </div>
              </div>
            );
          })}

          {/* "Weitere Termine" placeholder card */}
          {isSingleDays ? (
            <div className="bg-gray-900 rounded-2xl p-6 border border-dashed border-gray-800 flex items-center gap-4">
              <CalendarDays className="h-8 w-8 text-gray-700 flex-shrink-0" />
              <div>
                <h3 className="text-base font-bold text-gray-500">Weitere Termine</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Wähle oben den entsprechenden Zeitraum aus.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-2xl p-6 border border-dashed border-gray-800 flex flex-col justify-center items-center h-60 text-center">
              <CalendarDays className="h-10 w-10 text-gray-700 mb-3" />
              <h3 className="text-lg font-bold text-gray-500">Weitere Termine</h3>
              <p className="text-sm text-gray-600 mt-2 max-w-[200px]">
                Für spätere Monate wähle bitte oben den entsprechenden Zeitraum aus.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RentalCalendar;