import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Filter, Calendar as CalendarIcon, X, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  filterOptions: {
    statuses?: { value: string; label: string }[];
    types?: { value: string; label: string }[];
    showDateFilter?: boolean;
    showSearchFilter?: boolean;
  };
  searchPlaceholder?: string;
}

export interface FilterState {
  search: string;
  status: string;
  type: string;
  dateFrom: Date | null;
  dateTo: Date | null;
}

export default function FilterBar({ onFilterChange, filterOptions, searchPlaceholder }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    type: '',
    dateFrom: null,
    dateTo: null
  });

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      status: '',
      type: '',
      dateFrom: null,
      dateTo: null
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status) count++;
    if (filters.type) count++;
    if (filters.dateFrom || filters.dateTo) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      {/* Filter Toggle and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        {filterOptions.showSearchFilter && (
          <div className="flex-1">
            <Input
              placeholder={searchPlaceholder || "Cari..."}
              value={filters.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('search', e.target.value)}
              className="bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`relative border-purple-200 text-purple-700 hover:bg-purple-50 ${showFilters ? 'bg-purple-50 border-purple-300' : ''}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            {filterOptions.statuses && (
              <div>
                <label className="text-sm font-medium text-purple-700 mb-2 block">Status</label>
                <Select value={filters.status || "all"} onValueChange={(value: string) => updateFilter('status', value === "all" ? "" : value)}>
                  <SelectTrigger className="bg-white border-purple-200">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    {filterOptions.statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>
            )}

            {/* Type Filter */}
            {filterOptions.types && (
              <div>
                <label className="text-sm font-medium text-purple-700 mb-2 block">Tipe</label>
                <Select value={filters.type || "all"} onValueChange={(value: string) => updateFilter('type', value === "all" ? "" : value)}>
                  <SelectTrigger className="bg-white border-purple-200">
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    {filterOptions.types.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date From Filter */}
            {filterOptions.showDateFilter && (
              <div>
                <label className="text-sm font-medium text-purple-700 mb-2 block">Dari Tanggal</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white border-purple-200"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateFrom ? (
                        format(filters.dateFrom, "dd MMM yyyy", { locale: localeId })
                      ) : (
                        <span className="text-gray-500">Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateFrom}
                      onSelect={(date: Date | null) => updateFilter('dateFrom', date)}
                      initialFocus
                      locale={localeId}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Date To Filter */}
            {filterOptions.showDateFilter && (
              <div>
                <label className="text-sm font-medium text-purple-700 mb-2 block">Sampai Tanggal</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white border-purple-200"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateTo ? (
                        format(filters.dateTo, "dd MMM yyyy", { locale: localeId })
                      ) : (
                        <span className="text-gray-500">Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateTo}
                      onSelect={(date: Date | null) => updateFilter('dateTo', date)}
                      initialFocus
                      locale={localeId}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="pt-2 border-t border-purple-200">
              <p className="text-xs text-purple-600 mb-2">Filter aktif:</p>
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <Badge variant="secondary" className="bg-white border border-purple-200 text-purple-700">
                    Pencarian: {filters.search}
                    <button
                      onClick={() => updateFilter('search', '')}
                      className="ml-1 hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.status && (
                  <Badge variant="secondary" className="bg-white border border-purple-200 text-purple-700">
                    Status: {filterOptions.statuses?.find(s => s.value === filters.status)?.label}
                    <button
                      onClick={() => updateFilter('status', '')}
                      className="ml-1 hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.type && (
                  <Badge variant="secondary" className="bg-white border border-purple-200 text-purple-700">
                    Tipe: {filterOptions.types?.find(t => t.value === filters.type)?.label}
                    <button
                      onClick={() => updateFilter('type', '')}
                      className="ml-1 hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {(filters.dateFrom || filters.dateTo) && (
                  <Badge variant="secondary" className="bg-white border border-purple-200 text-purple-700">
                    Periode: {filters.dateFrom ? format(filters.dateFrom, "dd/MM", { locale: localeId }) : '...'} - {filters.dateTo ? format(filters.dateTo, "dd/MM", { locale: localeId }) : '...'}
                    <button
                      onClick={() => {
                        updateFilter('dateFrom', null);
                        updateFilter('dateTo', null);
                      }}
                      className="ml-1 hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
