import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  TwitterShareButton, TwitterIcon,
  LinkedinShareButton, LinkedinIcon,
  WhatsappShareButton, WhatsappIcon,
} from 'react-share';
import { getMedicineByIdApi } from '../../api/medicineApi';
import { getImageUrl, formatDate } from '../../utils/formatters';
import { PageLoader } from '../../components/common/Loader';

const MedicineDetail = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMedicineByIdApi(id)
      .then(setMedicine)
      .catch((err) => setError(err.response?.data?.message || 'Medicine not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageLoader />;

  if (error) {
    return (
      <div className="page-container py-20 text-center">
        <p className="text-5xl mb-4">😔</p>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{error}</h2>
        <Link to="/medicines" className="btn-primary mt-4">← Back to medicines</Link>
      </div>
    );
  }

  const imgUrl = getImageUrl(medicine.image);
  const shareUrl = window.location.href;
  const shareTitle = `${medicine.name} — Lifecare Supportive Solutions`;

  return (
    <div className="page-container py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link to="/medicines" className="hover:text-brand-600">Medicines</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{medicine.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="card overflow-hidden aspect-video lg:aspect-square flex items-center justify-center bg-gray-50">
          {imgUrl ? (
            <img src={imgUrl} alt={medicine.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <span className="text-7xl">💊</span>
              <span className="text-sm">No image available</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Pharmaceutical
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{medicine.name}</h1>
            {medicine.createdAt && (
              <p className="text-sm text-gray-400">Added {formatDate(medicine.createdAt)}</p>
            )}
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed text-base">{medicine.description}</p>
          </div>

          {/* Share */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-3">Share this medicine:</p>
            <div className="flex items-center gap-3">
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} title={shareTitle}>
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={shareUrl} title={shareTitle}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
            </div>
          </div>

          <Link to="/contact-us" className="btn-primary w-full sm:w-auto text-center mt-2">
            Enquire About This Medicine
          </Link>
        </div>
      </div>

      {/* Back */}
      <div className="mt-10 pt-8 border-t border-gray-100">
        <Link to="/medicines" className="btn-secondary text-sm">← Back to catalogue</Link>
      </div>
    </div>
  );
};

export default MedicineDetail;
