import { useState } from "react";
import Button from "../components/ui/button";
import { createSchedule } from "../api/schedules/schedules_api";
import { useCreateSchedule } from "../hooks/api_hooks/useSchedules";

const AddScheduleModal = ({
  isOpen,
  onClose,
  onScheduleAdded,
  buses,
  routes,
}) => {
  const [formData, setFormData] = useState({
    bus_id: "",
    route_id: "",
    departure_time: "",
    arrival_time: "",
  });

  const { mutate, isPending } = useCreateSchedule();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        console.log("Schedule Added successfully");
        // setFormData(for);
      },
      onError: (error) => {
        console.error("Error inside handleSubmit: ", error.message);
      },
    });
    // setFormData(initialFormData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-opacity-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Schedule</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bus
              </label>
              <select id="bus_id" name="bus_id" onChange={handleChange}>
                {buses.map((bus, idx) => (
                  <option key={idx} value={bus.id}>
                    {bus.plate_number}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Route
              </label>
              <select id="route_id" name="route_id" onChange={handleChange}>
                {routes.map((route, idx) => (
                  <option key={idx} value={route.id}>
                    {route.origin + " - " + route.destination}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departure Time
              </label>
              <input
                type="datetime-local"
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arrival Time
              </label>
              <input
                type="datetime-local"
                name="arrival_time"
                value={formData.arrival_time}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-full text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center px-4 py-2 text-white bg-primary-100 hover:bg-primary-80 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Schedule"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScheduleModal;
