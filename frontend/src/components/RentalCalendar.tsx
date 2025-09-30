import { useMemo } from 'react';
import { useCalendarData, CalendarEvent } from '@/hooks/useCalendarData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface WeekendDay {
  date: Date;
  day: 'Freitag' | 'Samstag';
  isOccupied: boolean;
  month: string;
  year: number;
  dateString: string; // YYYY-MM-DD für Vergleich
}

// Farbpalette für Special Events (transparente Hintergrundfarben, passend zu Website-Akzentfarben)
const eventColors: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400' },
  emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  amber: { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400' },
  rose: { bg: 'bg-rose-500/20', border: 'border-rose-500/30', text: 'text-rose-400' },
  cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
};

// Fallback-Farbe: Lilane Akzentfarbe der Website
const fallbackColor = { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400' };

const RentalCalendar = () => {
  const { events, loading, error } = useCalendarData();

  // Alle möglichen Wochenendtage bestimmen
  const weekendDays = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const days: WeekendDay[] = [];

    const allRentalMonths = [0, 1, 2, 3, 4, 8, 9, 10]; // Jan–Mai, Sep–Nov

    const futureRentalMonths = allRentalMonths.filter(month => month >= currentMonth);
    const nextYearMonths = allRentalMonths.filter(month => month < currentMonth);

    let rentalMonthsWithYears: { month: number; year: number }[] = [];
    futureRentalMonths.forEach(month => rentalMonthsWithYears.push({ month, year: currentYear }));
    nextYearMonths.slice(0, 4 - futureRentalMonths.length).forEach(month =>
      rentalMonthsWithYears.push({ month, year: currentYear + 1 })
    );
    rentalMonthsWithYears = rentalMonthsWithYears.slice(0, 4);

    rentalMonthsWithYears.forEach(({ month, year }) => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();

        // Nur Freitage (5) und Samstage (6)
        if (dayOfWeek === 5 || dayOfWeek === 6) {
          if (year === currentYear && month === currentMonth && date < currentDate) continue;

          const dayName = dayOfWeek === 5 ? 'Freitag' : 'Samstag';
          const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

          const isOccupied = events.some(event => {
            const eventStart = event.start;
            const eventEnd = event.end || eventStart;
            return dateString >= eventStart && dateString <= eventEnd;
          });

          days.push({ date, day: dayName, isOccupied, month: date.toLocaleDateString('de-DE', { month: 'long' }), year, dateString });
        }
      }
    });
    return days.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events]);

  // Gruppierung nach Monat
  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: WeekendDay[] } = {};
    weekendDays.forEach(day => {
      const key = `${day.month} ${day.year}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(day);
    });
    return groups;
  }, [weekendDays]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-accent-primary" />
        <span className="ml-2 text-lg">Verfügbarkeit wird geladen...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6 text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
          <p className="text-red-700">Fehler beim Laden der Verfügbarkeit: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Erklärung */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="h-6 w-6 text-accent-primary" />
          <h3 className="text-2xl font-bold text-white">Verfügbarkeit</h3>
        </div>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Unsere Location ist von Januar–Mai und September–November jeweils Freitags und Samstags buchbar. 
          Hier siehst du, welche Termine in den kommenden Monaten noch frei sind.
        </p>
      </div>

      {/* Kalender-Gitter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedByMonth).map(([monthYear, days]) => (
          <Card key={monthYear} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-white text-center">{monthYear}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {days.map((day, index) => {
                // Events an diesem Tag
                const specialEvent: CalendarEvent | undefined = events.find(event => {
                  if (!event.isEvent) return false;
                  const start = event.start;
                  const end = event.end || start;
                  return day.dateString >= start && day.dateString <= end;
                });

                const eventStyle = specialEvent ? eventColors[specialEvent.color || ''] || fallbackColor : null;

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all relative
                      ${specialEvent ? `${eventStyle.bg} ${eventStyle.border} ${eventStyle.text}` :
                        day.isOccupied ? 'bg-red-500/20 border border-red-500/30 text-red-400' :
                        'bg-green-500/20 border border-green-500/30 text-green-400'}
                      border border-white/20`}
                  >
                    {/* Datum & Tag */}
                    <div className="flex flex-col text-white">
                      <span className="font-semibold">{day.day}</span>
                      <span className="text-sm text-gray-200">
                        {day.date.getDate().toString().padStart(2, '0')}.
                        {(day.date.getMonth() + 1).toString().padStart(2, '0')}.
                      </span>
                    </div>

                    {/* Rechts: Status oder Event-Titel */}
                    {specialEvent ? (
                      <span className="font-semibold">{specialEvent.title}</span>
                    ) : day.isOccupied ? (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        <span className="font-semibold">Belegt</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Frei</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legende */}
      <div className="flex justify-center gap-8 pt-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <span className="text-gray-300">Frei – Buchung möglich</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-400" />
          <span className="text-gray-300">Belegt – Bereits vergeben</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/50"></div>
          <span className="text-gray-300">Event – Titel & Farbe</span>
        </div>
      </div>
    </div>
  );
};

export default RentalCalendar;