import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Calendar,
  Heart,
  Share2,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch property data from backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://stayfinder-backend-kmg8.onrender.com/api/listings/${id}`
        );
        if (!response.ok) {
          throw new Error("Property not found");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    alert("Booking functionality would be implemented here");
  };

  // Amenity icons mapping
  const amenityIcons = {
    WiFi: Wifi,
    "Free parking": Car,
    Kitchen: Coffee,
    "TV with cable": Tv,
    "Air conditioning": Wind,
    "Lake access": Waves,
    "Mountain view": Wind,
    "Ski storage": Car,
    Fireplace: Wind,
    Deck: Waves,
    "City view": Wind,
    "Gym access": Car,
    "Rooftop deck": Waves,
    Concierge: Coffee,
    "Beach access": Waves,
    Pool: Waves,
    "Hot tub": Waves,
    "Ocean view": Waves,
    "Private beach": Waves,
    "Desert view": Wind,
    "Hiking trails": Car,
    "Spa access": Coffee,
    "Outdoor shower": Waves,
    "Forest view": Wind,
    "Fire pit": Wind,
    "No WiFi": Wifi,
    "Wildlife watching": Car,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Property not found"}</p>
          <Button
            onClick={() => navigate("/")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to search
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {property.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="ml-1">({property.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="lg:col-span-1">
            <img
              src={property.images[selectedImage]}
              alt={property.title}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property view ${index + 2}`}
                className="w-full h-38 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedImage(index + 1)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Info */}
          <div className="lg:col-span-2">
            {/* Property Type & Host */}
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {property.type}
                  </h2>
                  <p className="text-gray-600">
                    {property.guests} guests · {property.bedrooms} bedrooms ·{" "}
                    {property.bathrooms} bathrooms
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    Host: {property.host}
                  </p>
                  <p className="text-sm text-gray-600">Superhost</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b pb-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About this place
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="border-b pb-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Coffee;
                  return (
                    <div key={index} className="flex items-center">
                      <IconComponent className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                House rules
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-700">Check-in: 3:00 PM - 11:00 PM</li>
                <li className="text-gray-700">Checkout: 11:00 AM</li>
                <li className="text-gray-700">No smoking</li>
                <li className="text-gray-700">No pets allowed</li>
                <li className="text-gray-700">No parties or events</li>
              </ul>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${property.price}
                    </span>
                    <span className="text-gray-600 ml-1">/ night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">
                      {property.rating}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({property.reviews})
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in
                      </label>
                      <Input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out
                      </label>
                      <Input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full"
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
                        className="pl-10"
                        min="1"
                        max={property.guests}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
                >
                  Reserve
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  You won't be charged yet
                </p>

                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      ${property.price} x 2 nights
                    </span>
                    <span className="text-gray-900">${property.price * 2}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900">$28</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total</span>
                    <span>${property.price * 2 + 28}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
