import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input
        type="text"
        placeholder="Search by claim ID, phone number, or keywords..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 w-full"
      />
    </div>
  );
};

export default SearchBar;