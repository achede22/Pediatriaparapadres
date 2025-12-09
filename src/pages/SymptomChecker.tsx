import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, AlertTriangle, Info, Stethoscope, ChevronRight, RefreshCw } from 'lucide-react';

// Simplified database of conditions and symptoms
// This is for demonstration and educational purposes only
const CONDITIONS = [
    {
        id: 'resfriado',
        name: 'Resfriado Común',
        symptoms: ['mocos', 'tos', 'estornudos', 'fiebre_leve', 'malestar'],
        description: 'Infección viral común de la nariz y garganta.',
        advice: 'Reposo, hidratación y lavados nasales. Consulte si hay dificultad respiratoria.'
    },
    {
        id: 'gripe',
        name: 'Gripe (Influenza)',
        symptoms: ['fiebre_alta', 'dolor_cuerpo', 'tos_seca', 'fatiga', 'dolor_cabeza'],
        description: 'Infección viral que ataca el sistema respiratorio.',
        advice: 'Mucho líquido y descanso. Consulte si la fiebre es persistente o hay dificultad para respirar.'
    },
    {
        id: 'gastroenteritis',
        name: 'Gastroenteritis',
        symptoms: ['diarrea', 'vomitos', 'dolor_abdominal', 'fiebre_leve'],
        description: 'Inflamación del estómago e intestinos.',
        advice: 'Lo más importante es la hidratación. Ofrezca suero oral poco a poco.'
    },
    {
        id: 'otitis',
        name: 'Otitis Media',
        symptoms: ['dolor_oido', 'fiebre', 'irritabilidad', 'secrecion_oido'],
        description: 'Infección del oído medio.',
        advice: 'Puede requerir antibióticos. Consulte a su pediatra para evaluación.'
    },
    {
        id: 'bronquiolitis',
        name: 'Bronquiolitis',
        symptoms: ['dificultad_respiratoria', 'sibilancias', 'tos', 'fiebre', 'rechazo_alimento'],
        description: 'Infección pulmonar común en niños pequeños.',
        advice: 'REQUIERE ATENCIÓN MÉDICA. Vigile signos de dificultad respiratoria.'
    },
    {
        id: 'roseola',
        name: 'Roséola',
        symptoms: ['fiebre_alta_repentina', 'erupcion_cutanea', 'irritabilidad'],
        description: 'Infección viral común que causa fiebre y luego sarpullido.',
        advice: 'Manejo de la fiebre. El sarpullido suele aparecer cuando baja la fiebre.'
    },
    {
        id: 'mano_pie_boca',
        name: 'Enfermedad Mano-Pie-Boca',
        symptoms: ['fiebre', 'llagas_boca', 'sarpullido_manos_pies', 'dolor_garganta'],
        description: 'Infección viral contagiosa común en niños pequeños.',
        advice: 'Alimentos fríos y blandos. Hidratación. Es muy contagioso.'
    }
];

const SYMPTOMS_LIST = [
    { id: 'fiebre_leve', label: 'Fiebre leve (< 38.5°C)' },
    { id: 'fiebre_alta', label: 'Fiebre alta (> 38.5°C)' },
    { id: 'fiebre_alta_repentina', label: 'Fiebre alta repentina' },
    { id: 'tos', label: 'Tos' },
    { id: 'tos_seca', label: 'Tos seca' },
    { id: 'mocos', label: 'Mocos / Congestión' },
    { id: 'estornudos', label: 'Estornudos' },
    { id: 'dolor_garganta', label: 'Dolor de garganta' },
    { id: 'dificultad_respiratoria', label: 'Dificultad para respirar' },
    { id: 'sibilancias', label: 'Silbidos al respirar' },
    { id: 'dolor_oido', label: 'Dolor de oído' },
    { id: 'secrecion_oido', label: 'Secreción del oído' },
    { id: 'vomitos', label: 'Vómitos' },
    { id: 'diarrea', label: 'Diarrea' },
    { id: 'dolor_abdominal', label: 'Dolor de barriga' },
    { id: 'erupcion_cutanea', label: 'Manchas en la piel' },
    { id: 'sarpullido_manos_pies', label: 'Granitos en manos/pies' },
    { id: 'llagas_boca', label: 'Llagas en la boca' },
    { id: 'dolor_cabeza', label: 'Dolor de cabeza' },
    { id: 'dolor_cuerpo', label: 'Dolor de cuerpo' },
    { id: 'fatiga', label: 'Cansancio excesivo' },
    { id: 'irritabilidad', label: 'Irritabilidad / Llanto' },
    { id: 'rechazo_alimento', label: 'No quiere comer' },
];

export default function SymptomChecker() {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);

    const toggleSymptom = (id: string) => {
        setSelectedSymptoms(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const getMatchedConditions = () => {
        if (selectedSymptoms.length === 0) return [];

        return CONDITIONS.map(condition => {
            const matchCount = condition.symptoms.filter(s => selectedSymptoms.includes(s)).length;
            return { ...condition, matchCount };
        })
            .filter(c => c.matchCount > 0)
            .sort((a, b) => b.matchCount - a.matchCount);
    };

    const reset = () => {
        setSelectedSymptoms([]);
        setShowResults(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 p-6 pb-24"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-slate-800">Chequeo de Síntomas</h1>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-sm text-blue-800">
                        Esta herramienta es solo una guía informativa y <strong>NO sustituye el diagnóstico médico</strong>.
                        Si su hijo parece muy enfermo, acuda a urgencias.
                    </p>
                </div>
            </div>

            {!showResults ? (
                <>
                    <p className="text-gray-600 mb-4 font-medium">Seleccione los síntomas que presenta el niño:</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {SYMPTOMS_LIST.map(symptom => (
                            <button
                                key={symptom.id}
                                onClick={() => toggleSymptom(symptom.id)}
                                className={`p-4 rounded-xl text-left transition-all flex items-center justify-between border-2 ${selectedSymptoms.includes(symptom.id)
                                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md'
                                        : 'bg-white border-transparent shadow-sm hover:bg-gray-50'
                                    }`}
                            >
                                <span className="font-medium">{symptom.label}</span>
                                {selectedSymptoms.includes(symptom.id) && (
                                    <Check className="w-5 h-5 text-blue-600" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="fixed bottom-6 left-0 right-0 px-6">
                        <button
                            onClick={() => setShowResults(true)}
                            disabled={selectedSymptoms.length === 0}
                            className={`w-full max-w-md mx-auto py-4 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${selectedSymptoms.length > 0
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <Stethoscope className="w-6 h-6" />
                            Analizar Síntomas
                        </button>
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Posibles Causas</h2>
                        <button
                            onClick={reset}
                            className="text-blue-600 font-medium flex items-center gap-1 hover:underline"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Reiniciar
                        </button>
                    </div>

                    <div className="space-y-4 mb-20">
                        {getMatchedConditions().length > 0 ? (
                            getMatchedConditions().map((condition, index) => (
                                <div
                                    key={condition.id}
                                    className="bg-white p-5 rounded-2xl shadow-md border-2 border-transparent hover:border-blue-100 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{condition.name}</h3>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                            {condition.matchCount} coincidencias
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">{condition.description}</p>

                                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                        <p className="text-yellow-800 text-sm font-medium flex gap-2">
                                            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                            {condition.advice}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-3xl shadow-sm">
                                <p className="text-gray-500">No encontramos coincidencias exactas en nuestra base de datos simplificada.</p>
                                <p className="text-gray-500 mt-2">Por favor, consulte a un médico para una evaluación completa.</p>
                            </div>
                        )}
                    </div>

                    <div className="fixed bottom-6 left-0 right-0 px-6">
                        <a
                            href="tel:911" // Or local emergency number
                            className="w-full max-w-md mx-auto py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <AlertTriangle className="w-6 h-6" />
                            Llamar a Emergencias
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
