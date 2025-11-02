
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import ServiceCard from './ServiceCard';
import Modal from './Modal';
import AddServiceForm from './AddServiceForm';
import { useAuth } from '../hooks/useAuth';

interface ServiceListProps {
  onSelectService: (serviceId: string) => void;
  onSelectTeam: (teamId: string) => void;
  onSelectUser: (userId: string) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ onSelectService, onSelectTeam, onSelectUser }) => {
  const { services } = useData();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredServices = useMemo(() => {
    return services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  return (
    <div>
      <div className="mb-8 p-4 bg-secondary border border-border rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
           <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-primary border border-border rounded-md py-2 pl-10 pr-4 focus:ring-accent focus:border-accent"
          />
        </div>
        {currentUser && (
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Add New Service
            </button>
        )}
      </div>

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} onViewDetails={onSelectService} onSelectTeam={onSelectTeam} onSelectUser={onSelectUser} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-secondary rounded-lg border border-border">
          <h3 className="text-xl font-semibold text-text-main">No services found</h3>
          <p className="text-muted mt-2">Try adjusting your search or add a new service.</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Service">
        <AddServiceForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ServiceList;