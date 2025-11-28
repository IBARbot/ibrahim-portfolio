import { motion } from "motion/react";
import {
  Plane,
  Hotel,
  Shield,
  Building,
  CheckCircle,
  Clock,
  MessageSquare,
  Mail,
  Calendar,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface BookingSubmission {
  id: string;
  type: "flight" | "hotel" | "insurance" | "embassy";
  name: string;
  email: string;
  phone: string;
  created_at: string;
  status: "new" | "contacted" | "completed";
  [key: string]: any;
}

interface BookingsTabProps {
  bookings?: BookingSubmission[];
}

export function BookingsTab({ bookings }: BookingsTabProps) {
  const getBookingIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane size={24} className="text-blue-600" />;
      case "hotel":
        return <Hotel size={24} className="text-purple-600" />;
      case "insurance":
        return <Shield size={24} className="text-green-600" />;
      case "embassy":
        return <Building size={24} className="text-orange-600" />;
      default:
        return <Plane size={24} className="text-slate-600" />;
    }
  };

  const getBookingTypeLabel = (type: string) => {
    switch (type) {
      case "flight":
        return "Uçuş";
      case "hotel":
        return "Otel";
      case "insurance":
        return "Sığorta";
      case "embassy":
        return "Səfirlik";
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="destructive" className="gap-1">
            <Clock size={12} /> Yeni
          </Badge>
        );
      case "contacted":
        return (
          <Badge className="gap-1 bg-blue-100 text-blue-800">
            <MessageSquare size={12} /> Əlaqə edildi
          </Badge>
        );
      case "completed":
        return (
          <Badge className="gap-1 bg-green-100 text-green-800">
            <CheckCircle size={12} /> Tamamlandı
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-slate-900">Sifariş və Rezervasiyalar</h2>
      </div>

      <div className="divide-y divide-slate-200">
        {!bookings || bookings.length === 0 ? (
          <div className="p-12 text-center">
            <Plane size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-slate-900 mb-2">Hələ sifariş yoxdur</h3>
            <p className="text-slate-600 mb-6">İlk rezervasiyalarınızı gözləyin</p>
          </div>
        ) : (
          bookings.map((booking, index) => (
            <motion.div
              key={booking.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getBookingIcon(booking.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-slate-900 truncate">{booking.name}</h3>
                    {getStatusBadge(booking.status)}
                    <Badge variant="outline" className="text-xs">
                      {getBookingTypeLabel(booking.type)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-2 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      {booking.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      {booking.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(booking.created_at).toLocaleDateString("az-AZ")}
                    </span>
                  </div>

                  {/* Additional booking details */}
                  {booking.type === "flight" && (
                    <div className="mt-2 text-sm text-slate-600">
                      {booking.from && booking.to && (
                        <p>
                          Marşrut: {booking.from} → {booking.to}
                        </p>
                      )}
                      {booking.date && <p>Tarix: {booking.date}</p>}
                    </div>
                  )}
                  {booking.type === "hotel" && (
                    <div className="mt-2 text-sm text-slate-600">
                      {booking.destination && <p>Yer: {booking.destination}</p>}
                      {booking.checkIn && booking.checkOut && (
                        <p>
                          Tarixlər: {booking.checkIn} - {booking.checkOut}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <a href={`mailto:${booking.email}`} className="inline-flex">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Mail size={16} />
                      <span className="hidden sm:inline">Email</span>
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <MessageSquare size={16} />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
