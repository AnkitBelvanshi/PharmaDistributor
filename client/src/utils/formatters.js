export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const truncate = (str, n = 120) => {
  if (!str) return '';
  return str.length > n ? str.slice(0, n) + '…' : str;
};

// Explicit map: normalised medicine name (UPPERCASE) → exact filename in /images/Medicines/
// Handles mixed extensions (.jpg/.png), lowercase filenames, and name/file spelling differences.
const MEDICINE_IMAGE_MAP = {
  'ADCETRIS':       'ADCETRIS.jpg',
  'ANAGRELIDE':     'ANAGRELIDE.jpg',
  'ATRIANCE':       'ATRIANCE.jpg',
  'AYVAKIT':        'AYVAKIT.jpg',
  'BACLOFEN':       'BACLOFEN.jpg',
  'BLINCYTO':       'BLINCYTO.jpg',
  'BRAFTOVI':       'BRAFTOVI.jpg',
  'COLUMVI':        'COLUMVI.jpg',
  'COTELLIC':       'COTELLIC.jpg',
  'DEFITELIO':      'DEFITELIO.jpg',
  'DIACOMIT':       'DIACOMIT.jpg',
  'EMICITAB':       'EMICITAB.png',
  'ENHERTU':        'ENHERTU.jpg',
  'ERWINASE':       'ERWINASE.jpg',
  'FETROJA SDV':    'FETROJA SDV.jpg',
  'FIRDAPSE':       'FIRDAPSE.jpg',
  'FOSCAVIR':       'FOSCAVIR.jpg',
  'GIOTRIF':        'giotrif.jpg',
  'ILOPERA':        'ILOPERA.jpg',
  'IMDELLTRA':      'IMDELLTRA.jpg',
  'INQOVI':         'INQOVI.jpg',
  'ITOVEBI':        'ITOVEBI.jpg',
  'JASCAYD':        'JASCAYD.png',
  'KINERET':        'KINERET.jpg',
  'MINJUVI':        'MINJUVI.jpg',
  'MOUNJARO':       'MOUNJARO.jpg',
  'ORSERDU':        'ORSERDU.jpg',
  'PONATINIB':      'PONATINIB.jpg',
  'POTELIGEO':      'POTELIGEO.jpg',
  'POZELIMAB':      'POZELIMAB.jpg',
  'PREVYMIS':       'PREVYMIS.jpg',
  'SELPERCATINIB':  'SELVERCATINIB.jpg',
  'TRODELVY':       'TRODELVY.jpg',
  'TRUQAP':         'TRUQAP.jpg',
  'TUKSYA':         'TUKYSA.png',
  'VEBULIS':        'VEBULIS.png',
  'VENCLYXTO':      'VENCLYXTO.jpg',
  'VENTAVIS':       'VENTAVIS.jpg',
  'VYLOY':          'VYLOY.jpg',
  'XIIDRA':         'xiidra.png',
  'ZEPZELCA':       'ZEPZELCA.jpg',
};

// Returns the public static image path for a medicine.
// Falls back to the server upload path when no public image is mapped.
export const getImageUrl = (filename, name) => {
  if (name) {
    const key = name.split('(')[0].trim().toUpperCase();
    const imageFile = MEDICINE_IMAGE_MAP[key];
    if (imageFile) return `/images/Medicines/${encodeURIComponent(imageFile)}`;
  }
  return getServerImageUrl(filename);
};

// Always returns the server-side upload URL (used by admin forms).
export const getServerImageUrl = (filename) => {
  if (!filename) return null;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const serverRoot = apiUrl.replace(/\/api\/?$/, '');
  return `${serverRoot}/uploads/${filename}`;
};
