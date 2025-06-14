import React, { useState } from "react";
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

  // Mock search results data
  const properties = [
    {
      id: 1,
      title: "Modern Lakeside Cabin",
      location: "Lake Tahoe, CA",
      price: 189,
      rating: 4.9,
      reviews: 127,
      image:
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      host: "Sarah Chen",
      type: "Entire cabin",
      guests: 6,
      bedrooms: 3,
    },
    {
      id: 2,
      title: "Cozy Mountain Retreat",
      location: "Aspen, CO",
      price: 245,
      rating: 4.8,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      host: "Michael Rodriguez",
      type: "Entire home",
      guests: 8,
      bedrooms: 4,
    },
    {
      id: 3,
      title: "Urban Loft Downtown",
      location: "Portland, OR",
      price: 156,
      rating: 4.7,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      host: "Emma Thompson",
      type: "Entire loft",
      guests: 4,
      bedrooms: 2,
    },
    {
      id: 4,
      title: "Beachfront Villa",
      location: "Malibu, CA",
      price: 389,
      rating: 5.0,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop",
      host: "David Park",
      type: "Entire villa",
      guests: 10,
      bedrooms: 5,
    },
    {
      id: 5,
      title: "Desert Oasis Lodge",
      location: "Sedona, AZ",
      price: 298,
      rating: 4.9,
      reviews: 91,
      image:
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop",
      host: "Rachel Adams",
      type: "Entire lodge",
      guests: 6,
      bedrooms: 3,
    },
    {
      id: 6,
      title: "Forest Hideaway",
      location: "Olympic National Park, WA",
      price: 167,
      rating: 4.8,
      reviews: 74,
      image:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      host: "James Wilson",
      type: "Entire cabin",
      guests: 4,
      bedrooms: 2,
    },
  ];

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
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate("/")}
            >
              StayFinder
            </h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-emerald-600"
              >
                Become a Host
              </Button>
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

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
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8">
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

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    Apply Filters
                  </Button>
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
                  {properties.length} properties found
                </p>
              </div>
              <Button variant="outline" className="flex items-center">
                <Map className="w-4 h-4 mr-2" />
                Show map
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-3"
              >
                Load More Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
