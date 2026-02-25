import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Stethoscope, RefreshCw, AlertTriangle, Info, ChevronRight } from 'lucide-react';

const RAW_SYMPTOMS_LIST = [
    { id: 'alteracion_conciencia', label: 'Alteración de conciencia (Somnoliento, confuso y agitado)' },
    { id: 'antecedente_prematuridad', label: 'Antecedente de prematuridad' },
    { id: 'apneas', label: 'Apneas / Pausas respiratorias' },
    { id: 'conjuntivitis', label: 'Conjuntivitis' },
    { id: 'cuadro_gripal_previo', label: 'Cuadro gripal hace 2 a 3 días' },
    { id: 'diarrea', label: 'Diarrea' },
    { id: 'dificultad_respiratoria', label: 'Dificultad para respirar' },
    { id: 'dolor_abdominal', label: 'Dolor de barriga' },
    { id: 'dolor_cabeza', label: 'Dolor de cabeza' },
    { id: 'dolor_cuerpo', label: 'Dolor de cuerpo' },
    { id: 'dolor_garganta', label: 'Dolor de garganta' },
    { id: 'dolor_oido', label: 'Dolor de oído' },
    { id: 'erupcion_cutanea', label: 'Manchas en la piel / Sarpullido' },
    { id: 'estornudos', label: 'Estornudos' },
    { id: 'estridor_agudo', label: 'Estridor agudo / Ruido al tomar aire' },
    { id: 'fatiga', label: 'Cansancio excesivo' },
    { id: 'fiebre_alta', label: 'Fiebre alta (> 38.5°C)' },
    { id: 'fiebre_alta_repentina', label: 'Fiebre alta repentina' },
    { id: 'fiebre_leve', label: 'Fiebre leve (< 38.5°C)' },
    { id: 'gangleos_cuello', label: 'Gangleos en el cuello inflamados' },
    { id: 'incapaz_hablar_beber', label: 'Incapaz de hablar o de beber' },
    { id: 'irritabilidad', label: 'Irritabilidad / Llanto constante' },
    { id: 'llagas_boca', label: 'Llagas en la boca (Aftas)' },
    { id: 'mocos', label: 'Mocos / Congestión' },
    { id: 'rechazo_alimento', label: 'No quiere comer' },
    { id: 'respiracion_rapida', label: 'Respiración rápida' },
    { id: 'sarpullido_manos_pies', label: 'Granitos en manos/pies' },
    { id: 'saturacion_o2_baja', label: 'Saturación de oxígeno < 92%' },
    { id: 'saturacion_o2_muy_baja', label: 'Saturación de oxígeno ≤ 84%' },
    { id: 'saturacion_o2_baja_sin_mejoria', label: 'Saturación < 92% que no mejora con tto' },
    { id: 'secrecion_oido', label: 'Secreción del oído' },
    { id: 'sibilancias', label: 'Sibilancias / Silbidos al respirar' },
    { id: 'sibilancias_primer_episodio', label: 'Primer episodio de sibilancias' },
    { id: 'tiraje_o_respiracion_rapida_sin_mejoria', label: 'Tiraje o resp. rápida que no mejora con tto' },
    { id: 'tiraje_subcostal', label: 'Tiraje subcostal (se hunden costillas al respirar)' },
    { id: 'tiraje_subcostal_supraclavicular', label: 'Tiraje subcostal y/o supraclavicular' },
    { id: 'tos_productiva', label: 'Tos Productiva (con flema)' },
    { id: 'tos_seca', label: 'Tos Seca' },
    { id: 'vomitos', label: 'Vómitos' },
];

const GENERAL_CONDITIONS = [
    {
        id: 'resfriado', name: 'Resfriado Común',
        symptoms: ['mocos', 'tos_productiva', 'tos_seca', 'estornudos', 'fiebre_leve', 'fatiga', 'gangleos_cuello'],
        description: 'Infección viral común de la nariz y garganta.',
        advice: 'Reposo, hidratación y lavados nasales. Consulte si hay dificultad respiratoria.'
    },
    {
        id: 'gripe', name: 'Gripe (Influenza)',
        symptoms: ['fiebre_alta', 'dolor_cuerpo', 'tos_seca', 'fatiga', 'dolor_cabeza'],
        description: 'Infección viral que ataca el sistema respiratorio.',
        advice: 'Mucho líquido y descanso. Consulte si la fiebre es persistente.'
    },
    {
        id: 'gastroenteritis', name: 'Gastroenteritis',
        symptoms: ['diarrea', 'vomitos', 'dolor_abdominal', 'fiebre_leve'],
        description: 'Inflamación del estómago e intestinos.',
        advice: 'Lo más importante es la hidratación. Ofrezca suero oral poco a poco.'
    },
    {
        id: 'otitis', name: 'Otitis Media',
        symptoms: ['dolor_oido', 'fiebre_leve', 'fiebre_alta', 'irritabilidad', 'secrecion_oido'],
        description: 'Infección del oído medio.',
        advice: 'Puede requerir antibióticos. Consulte a su pediatra para evaluación.'
    },
    {
        id: 'mano_pie_boca', name: 'Enfermedad Mano-Pie-Boca',
        symptoms: ['fiebre_leve', 'llagas_boca', 'sarpullido_manos_pies', 'dolor_garganta'],
        description: 'Infección viral contagiosa común en niños pequeños.',
        advice: 'Alimentos fríos y blandos. Hidratación. Es muy contagioso.'
    }
];

export default function SymptomChecker() {
    const [step, setStep] = useState<number>(1);
    const [ageValue, setAgeValue] = useState<string>('');
    const [ageUnit, setAgeUnit] = useState<'meses' | 'años'>('meses');
    const [isRecurrent, setIsRecurrent] = useState<boolean | null>(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

    // Sort symptoms alphabetically
    const SYMPTOMS_LIST = useMemo(() => {
        return [...RAW_SYMPTOMS_LIST].sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const toggleSymptom = (id: string) => {
        setSelectedSymptoms(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const has = (id: string) => selectedSymptoms.includes(id);

    const analyzeERA = () => {
        const ageMonths = ageUnit === 'años' ? Number(ageValue) * 12 : Number(ageValue);
        const results = [];

        // CRUP GRAVE
        if (has('estridor_agudo') && (has('alteracion_conciencia') || has('tiraje_subcostal_supraclavicular') || has('saturacion_o2_baja') || ageMonths < 3)) {
            results.push({
                id: 'crup_grave',
                name: 'CRUP GRAVE 🚨',
                isEmergency: true,
                description: 'Obstrucción respiratoria severa que requiere atención inmediata.',
                advice: 'TRATAMIENTO: Referir URGENTEMENTE al hospital ("REFIERA"). Administrar oxígeno, administrar Dexametasona, nebulización con adrenalina.'
            });
        }
        // CRUP (Leve/Moderado)
        else if (has('estridor_agudo') && !has('alteracion_conciencia') && !has('tiraje_subcostal_supraclavicular') && !has('saturacion_o2_baja') && ageMonths >= 3) {
            results.push({
                id: 'crup',
                name: 'CRUP',
                isEmergency: false,
                description: 'Obstrucción de la vía aérea superior comúnmente de origen viral.',
                advice: 'TRATAMIENTO: Administrar dosis de Dexametasona. Clasificar la severidad de la obstrucción y tratar adecuadamente.'
            });
        }

        // BRONQUIOLITIS GRAVE
        if (ageMonths < 24 && has('sibilancias_primer_episodio') && has('cuadro_gripal_previo') &&
            (has('tiraje_subcostal') || has('respiracion_rapida') || has('apneas') || has('saturacion_o2_baja') || ageMonths < 3 || (ageMonths < 6 && has('antecedente_prematuridad')))) {
            results.push({
                id: 'bronquiolitis_grave',
                name: 'BRONQUIOLITIS GRAVE 🚨',
                isEmergency: true,
                description: 'Infección pulmonar severa con signos de dificultad respiratoria crítica.',
                advice: 'TRATAMIENTO: Referir URGENTEMENTE al hospital ("REFIERA"). Administrar oxígeno. Si tolera vía oral, aumentar ingesta de líquidos.'
            });
        }
        // BRONQUIOLITIS (Leve/Moderado)
        else if (ageMonths < 24 && has('sibilancias_primer_episodio') && has('cuadro_gripal_previo') &&
            !has('tiraje_subcostal') && !has('respiracion_rapida') && !has('apneas') && !has('saturacion_o2_baja') &&
            ((ageMonths >= 3 && !has('antecedente_prematuridad')) || (ageMonths >= 6 && has('antecedente_prematuridad')))) {
            results.push({
                id: 'bronquiolitis',
                name: 'BRONQUIOLITIS',
                isEmergency: false,
                description: 'Infección pulmonar común en niños pequeños.',
                advice: 'TRATAMIENTO: Aseo nasal con suero fisiológico cada 3-4 horas. Aumentar líquidos orientando signos de alarma en casa. Seguimiento en dos días.'
            });
        }

        // SIBILANCIA GRAVE
        const hasSibilancias = has('sibilancias') || has('sibilancias_primer_episodio');
        if (((ageMonths >= 24 && hasSibilancias) || (isRecurrent && hasSibilancias) || hasSibilancias) &&
            (has('incapaz_hablar_beber') || has('alteracion_conciencia') || has('tiraje_o_respiracion_rapida_sin_mejoria') || has('saturacion_o2_muy_baja') || has('saturacion_o2_baja_sin_mejoria'))) {
            results.push({
                id: 'sibilancia_grave',
                name: 'SIBILANCIA GRAVE / RECURRENTE GRAVE 🚨',
                isEmergency: true,
                description: 'Episodio de obstrucción bronquial grave que compromete la oxigenación.',
                advice: 'TRATAMIENTO: Referir URGENTEMENTE al hospital. Administrar oxígeno. Administrar Beta-agonista cada 20 min x 3. Si es recurrente, 1era dosis de corticosteroide.'
            });
        }
        // SIBILANCIA O SIBILANCIA RECURRENTE (Leve/Moderado)
        else if (!results.some(r => r.id === 'bronquiolitis' || r.id === 'bronquiolitis_grave') &&
            ((ageMonths >= 24 && hasSibilancias) || (isRecurrent && hasSibilancias) || hasSibilancias) &&
            !has('alteracion_conciencia') && !has('saturacion_o2_muy_baja')) {
            results.push({
                id: 'sibilancia',
                name: 'SIBILANCIA O SIBILANCIA RECURRENTE',
                isEmergency: false,
                description: 'Episodio de obstrucción bronquial controlable.',
                advice: 'TRATAMIENTO: Iniciar esquema Beta-agonista en sala ERA. Si es recurrente administrar 1era dosis de corticosteroide. Reclasificar luego del tratamiento.'
            });
        }

        return results;
    };

    const getMatchedConditions = () => {
        if (selectedSymptoms.length === 0) return [];

        // Check for severe ERA criteria first
        const eraResults = analyzeERA();
        if (eraResults.length > 0) return eraResults;

        // Fallback to general illnesses
        return GENERAL_CONDITIONS.map(condition => {
            // Count how many symptoms are matched
            const matchCount = condition.symptoms.filter(s => selectedSymptoms.includes(s)).length;
            // Calculate a matching percentage or just require at least 1 match
            // To make "descarte" work better, we will return it if matchCount > 0
            return {
                ...condition,
                matchCount,
                isEmergency: false
            };
        })
            .filter(c => c.matchCount > 0)
            .sort((a, b) => b.matchCount - a.matchCount);
    };

    const reset = () => {
        setStep(1);
        setAgeValue('');
        setIsRecurrent(null);
        setSelectedSymptoms([]);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 p-6 pb-24"
        >
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => step > 1 ? setStep(step - 1) : window.history.back()}
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-slate-800">Chequeo de Síntomas</h1>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">1. ¿Qué edad tiene el niño/a?</h2>
                        <div className="flex gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm">
                            <input
                                type="number"
                                min="0"
                                value={ageValue}
                                onChange={(e) => setAgeValue(e.target.value)}
                                placeholder="Ej: 8"
                                className="w-full text-lg border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
                            />
                            <select
                                value={ageUnit}
                                onChange={(e) => setAgeUnit(e.target.value as 'meses' | 'años')}
                                className="w-1/2 text-lg border-2 border-gray-200 rounded-xl p-3 bg-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="meses">Meses</option>
                                <option value="años">Años</option>
                            </select>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 flex gap-3 text-blue-800">
                            <Info className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">La edad es muy importante porque ciertas enfermedades predominan a ciertas edades, como la bronquiolitis o el asma.</p>
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            disabled={!ageValue}
                            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex justify-center items-center gap-2 ${ageValue ? 'bg-blue-600 text-white shadow-lg active:scale-95 hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            Siguiente Paso <ChevronRight className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">2. ¿Estos síntomas o problemas son frecuentes/recurrentes?</h2>
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => { setIsRecurrent(true); setStep(3); }}
                                className="flex-1 bg-white border-2 border-transparent hover:border-blue-500 p-6 rounded-2xl shadow-sm active:scale-95 transition-all text-center"
                            >
                                <span className="text-2xl font-bold text-gray-800 mb-2 block">Sí</span>
                                <span className="text-gray-500 text-sm">Le pasa a menudo</span>
                            </button>
                            <button
                                onClick={() => { setIsRecurrent(false); setStep(3); }}
                                className="flex-1 bg-white border-2 border-transparent hover:border-blue-500 p-6 rounded-2xl shadow-sm active:scale-95 transition-all text-center"
                            >
                                <span className="text-2xl font-bold text-gray-800 mb-2 block">No</span>
                                <span className="text-gray-500 text-sm">Es la primera vez</span>
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
                        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <p className="text-sm text-blue-800">
                                    Esta herramienta es una guía informativa y <strong>NO sustituye el diagnóstico médico</strong>. Marque todos los aplicables.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mb-4 text-gray-800">3. Seleccione los síntomas ordenados alfabéticamente:</h2>
                        <div className="space-y-3 mb-24">
                            {SYMPTOMS_LIST.map((symptom, index) => {
                                const isSelected = selectedSymptoms.includes(symptom.id);
                                return (
                                    <button
                                        key={symptom.id}
                                        onClick={() => toggleSymptom(symptom.id)}
                                        className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between border-2 ${isSelected ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-white border-gray-100 shadow-sm hover:border-blue-200'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="bg-gray-100 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                                {index + 1}
                                            </span>
                                            <span className={`font-medium text-lg leading-tight ${isSelected ? 'text-blue-800' : 'text-gray-700'}`}>
                                                {symptom.label}
                                            </span>
                                        </div>

                                        {/* Toggle Switch Component - 3D Style */}
                                        <div className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out border-2 shadow-inner drop-shadow-sm ${isSelected ? 'bg-lime-400 border-lime-500' : 'bg-gray-200 border-gray-300'}`}>
                                            <div className={`absolute top-0.5 left-0.5 bg-gradient-to-b from-white to-gray-100 w-6 h-6 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-gray-200 transform transition-transform duration-300 ease-in-out flex items-center justify-center ${isSelected ? 'translate-x-8' : 'translate-x-0'}`}>
                                                {/* Inner bevel effect */}
                                                <div className="w-4 h-4 rounded-full bg-gradient-to-b from-gray-50 to-gray-200 shadow-inner"></div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 px-6 backdrop-blur-md p-4 pt-6 bg-slate-50/90 border-t border-gray-200/50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pb-8">
                            <button
                                onClick={() => setStep(4)}
                                disabled={selectedSymptoms.length === 0}
                                className={`w-full max-w-md mx-auto py-4 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${selectedSymptoms.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <Stethoscope className="w-6 h-6" />
                                Analizar Síntomas
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Resultados del Análisis</h2>
                            <button onClick={reset} className="text-blue-600 font-medium flex items-center gap-1 hover:underline bg-blue-50 py-1 px-3 rounded-full">
                                <RefreshCw className="w-4 h-4" /> Nuevo
                            </button>
                        </div>

                        <div className="space-y-4 mb-24">
                            {getMatchedConditions().length > 0 ? (
                                getMatchedConditions().map((condition) => (
                                    <div key={condition.id} className={`p-5 rounded-3xl shadow-md border-2 transition-colors ${condition.isEmergency ? 'bg-red-50 border-red-500' : 'bg-white border-transparent hover:border-blue-200'}`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className={`text-xl font-bold ${condition.isEmergency ? 'text-red-700' : 'text-gray-900'}`}>
                                                {condition.name}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 font-medium text-sm mb-4 leading-relaxed">{condition.description}</p>

                                        {/* Link to DOCX shared document */}
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                alert("Por favor inserta el enlace real del documento .docx que proporcionaste.");
                                            }}
                                            className="inline-flex flex-row items-center justify-center w-full gap-2 text-sm text-blue-700 font-bold mb-4 hover:bg-blue-100 bg-blue-50 border border-blue-200 shadow-sm transition-colors px-4 py-3 rounded-xl"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" /></svg>
                                            Abrir Documento Clínico (.docx)
                                        </a>

                                        <div className={`p-4 rounded-2xl border ${condition.isEmergency ? 'bg-red-100 border-red-200 text-red-900' : 'bg-yellow-50 border-yellow-200 text-yellow-900'}`}>
                                            <p className="text-sm font-bold flex gap-2 items-start">
                                                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                                <span>{condition.advice}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-3xl shadow-sm">
                                    <p className="text-gray-500 text-lg mb-2">No encontramos coincidencias claras en nuestra base de datos.</p>
                                    <p className="text-gray-400">Por favor, consulte a un pediatra para una evaluación completa.</p>
                                </div>
                            )}
                        </div>

                        <div className="fixed bottom-0 left-0 right-0 px-6 backdrop-blur-md bg-slate-50/90 border-t border-gray-200/50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pb-8 pt-4">
                            <a href="tel:911" className="w-full max-w-md mx-auto py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2">
                                <AlertTriangle className="w-6 h-6" />
                                Llamar a Emergencias
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
