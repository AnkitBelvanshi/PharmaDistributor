import { Link } from 'react-router-dom';
import { getImageUrl, truncate } from '../../utils/formatters';

const MedicineCard = ({ medicine }) => {
  const imgUrl = getImageUrl(medicine.image);

  return (
    <Link
      to={`/medicines/${medicine.id}`}
      className="card group flex flex-col hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div className="aspect-video bg-gray-100 overflow-hidden flex-shrink-0">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={medicine.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-brand-50 gap-2">
            <span className="text-4xl">💊</span>
            <span className="text-xs text-brand-400 font-medium">No image</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors leading-snug">
          {medicine.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">
          {truncate(medicine.description, 100)}
        </p>
        <span className="mt-2 text-xs font-medium text-brand-600 group-hover:underline">
          View details →
        </span>
      </div>
    </Link>
  );
};

export default MedicineCard;
