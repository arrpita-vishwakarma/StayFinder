import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
  Filter,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/ui/navbar";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchLocation, setSearchLocation] = useState(
    searchParams.get("location") || ""
  );
  const [checkIn, setCheckIn] = useState(searchParams.get("checkin") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkout") || "");
  const [guests, setGuests] = useState(searchParams.get("guests") || "2");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [propertyTypes, setPropertyTypes] = useState({
    entirePlace: false,
    privateRoom: false,
    sharedRoom: false,
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from backend with search parameters
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        // Build query parameters
        const queryParams = new URLSearchParams();
        if (searchLocation) queryParams.append("location", searchLocation);
        if (guests) queryParams.append("guests", guests);
        if (priceRange[0] > 0) queryParams.append("minPrice", priceRange[0]);
        if (priceRange[1] < 1000) queryParams.append("maxPrice", priceRange[1]);

        // Add property type filter if any are selected
        const selectedTypes = [];
        if (propertyTypes.entirePlace)
          selectedTypes.push(
            "Entire home",
            "Entire cabin",
            "Entire loft",
            "Entire villa",
            "Entire lodge"
          );
        if (propertyTypes.privateRoom) selectedTypes.push("Private room");
        if (propertyTypes.sharedRoom) selectedTypes.push("Shared room");

        if (selectedTypes.length > 0) {
          selectedTypes.forEach((type) =>
            queryParams.append("propertyType", type)
          );
        }

        const response = await fetch(
          `http://localhost:5000/api/listings?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchLocation, guests, priceRange, propertyTypes]);

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      location: searchLocation,
      checkin: checkIn,
      checkout: checkOut,
      guests: guests,
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  const PropertyCard = ({ property }) => (
    <Card
      className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite functionality
          }}
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-900">
            {property.type}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-sm text-gray-500 ml-1">
              ({property.reviews})
            </span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-emerald-600 transition-colors">
          {property.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {property.guests} guests · {property.bedrooms} bedrooms
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${property.price}
            </span>
            <span className="text-gray-600 ml-1">/ night</span>
          </div>
          <span className="text-sm text-gray-500">Host: {property.host}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Where
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search destinations"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="number"
                    placeholder="2"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>

                  {/* Property Type */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Property Type</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="entirePlace"
                          checked={propertyTypes.entirePlace}
                          onCheckedChange={(checked) =>
                            setPropertyTypes((prev) => ({
                              ...prev,
                              entirePlace: checked,
                            }))
                          }
                        />
                        <label htmlFor="entirePlace" className="text-sm">
                          Entire place
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="privateRoom"
                          checked={propertyTypes.privateRoom}
                          onCheckedChange={(checked) =>
                            setPropertyTypes((prev) => ({
                              ...prev,
                              privateRoom: checked,
                            }))
                          }
                        />
                        <label htmlFor="privateRoom" className="text-sm">
                          Private room
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sharedRoom"
                          checked={propertyTypes.sharedRoom}
                          onCheckedChange={(checked) =>
                            setPropertyTypes((prev) => ({
                              ...prev,
                              sharedRoom: checked,
                            }))
                          }
                        />
                        <label htmlFor="sharedRoom" className="text-sm">
                          Shared room
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Min price"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value) || 0,
                            priceRange[1],
                          ])
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Max price"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value) || 1000,
                          ])
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h2>
                <p className="text-gray-600">
                  {loading
                    ? "Loading..."
                    : `${properties.length} properties found`}
                </p>
              </div>
              <Button variant="outline" className="flex items-center">
                <Map className="w-4 h-4 mr-2" />
                Show map
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <p className="mt-4 text-gray-600">Loading properties...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Try Again
                </Button>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  No properties found matching your criteria.
                </p>
                <Button
                  onClick={() => setShowFilters(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Adjust Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {/* Load More */}
            {properties.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-3"
                >
                  Load More Properties
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
