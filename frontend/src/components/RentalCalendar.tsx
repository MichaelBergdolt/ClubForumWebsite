import { useMemo } from 'react';
import { useCalendarData } from '@/hooks/useCalendarData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface WeekendDay {
  date: Date;
  day: 'Freitag' | 'Samstag';
  isOccupied: boolean;
  month: string;
  year: number;
}

const RentalCalendar = () => {
  const { events, loading, error } = useCalendarData();

  // Generate weekend days for rental periods (Jan-May, Sep-Nov)
  const weekendDays = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const days: WeekendDay[] = [];
    
    // All possible rental months: Jan-May (0-4), Sep-Nov (8-10)
    const allRentalMonths = [0, 1, 2, 3, 4, 8, 9, 10];
    
    // Filter to get only current and future rental months
    const futureRentalMonths = allRentalMonths.filter(month => {
      // For current year, only include months >= current month
      return month >= currentMonth;
    });
    
    // If we need more months for next year (when current month is late in year)
    const nextYearMonths = allRentalMonths.filter(month => month < currentMonth);
    
    // Combine current year future months with next year months if needed
    let rentalMonthsWithYears: { month: number; year: number }[] = [];
    
    // Add current year months
    futureRentalMonths.forEach(month => {
      rentalMonthsWithYears.push({ month, year: currentYear });
    });
    
    // Add next year months if we need more to reach 4 months total
    const remainingSlots = 4 - futureRentalMonths.length;
    if (remainingSlots > 0) {
      nextYearMonths.slice(0, remainingSlots).forEach(month => {
        rentalMonthsWithYears.push({ month, year: currentYear + 1 });
      });
    }
    
    // Limit to 4 months total
    rentalMonthsWithYears = rentalMonthsWithYears.slice(0, 4);
    
    // Process each selected rental month
    rentalMonthsWithYears.forEach(({ month, year }) => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      // Check each day of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        
        // Only include Fridays (5) and Saturdays (6)
        if (dayOfWeek === 5 || dayOfWeek === 6) {
          // Skip dates that are in the past (only for current month)
          if (year === currentYear && month === currentMonth && date < currentDate) {
            continue;
          }
          
          const dayName = dayOfWeek === 5 ? 'Freitag' : 'Samstag';
          
          // Check if this date has an event (is occupied)
          const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
          const isOccupied = events.some(event => {
            const eventStart = event.start.split('T')[0];
            const eventEnd = event.end?.split('T')[0] || eventStart;
            return dateString >= eventStart && dateString <= eventEnd;
          });
          
          days.push({
            date,
            day: dayName,
            isOccupied,
            month: date.toLocaleDateString('de-DE', { month: 'long' }),
            year: date.getFullYear()
          });
        }
      }
    });
    
    return days.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events]);

  // Group by month for better display
  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: WeekendDay[] } = {};
    
    weekendDays.forEach(day => {
      const key = `${day.month} ${day.year}`;
      if (!groups[key]) {
        groups[key] = [];
      }
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
      {/* Explanation text */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="h-6 w-6 text-accent-primary" />
          <h3 className="text-2xl font-bold text-white">Verfügbarkeit</h3>
        </div>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Unsere Location ist von Januar–Mai und September–November jeweils Freitags und Samstags buchbar. 
          Hier siehst du, welche Termine noch frei sind.
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedByMonth).map(([monthYear, days]) => (
          <Card key={monthYear} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-white text-center">
                {monthYear}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                    day.isOccupied
                      ? 'bg-red-500/20 border border-red-500/30'
                      : 'bg-green-500/20 border border-green-500/30'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">
                      {day.day}
                    </span>
                    <span className="text-sm text-gray-300">
                      {day.date.getDate().toString().padStart(2, '0')}.{(day.date.getMonth() + 1).toString().padStart(2, '0')}.
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-2 ${
                    day.isOccupied ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {day.isOccupied ? (
                      <>
                        <XCircle className="h-5 w-5" />
                        <span className="font-semibold">Belegt</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Frei</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 pt-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <span className="text-gray-300">Frei – Buchung möglich</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-400" />
          <span className="text-gray-300">Belegt – Bereits vergeben</span>
        </div>
      </div>
    </div>
  );
};

export default RentalCalendar;