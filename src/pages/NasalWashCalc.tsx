import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calculator, Droplet, Info, Scale } from 'lucide-react';

export default function NasalWashCalc() {
    const [weight, setWeight] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const w = parseFloat(weight);
        if (!w || w <= 0) return;

        // Logic: 
        // < 10kg: 5-10ml per nostril (using 10ml as safe upper limit for wash)
        // 10-20kg: 10-20ml per nostril
        // > 20kg: 20-50ml per nostril
        // This is a simplified guide.

        let amount = 0;
        if (w < 10) amount = 5;
        else if (w < 20) amount = 10;
        else amount = 20;

        setResult(amount);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-cyan-50 p-6"
        >
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => window.history.back()}
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-cyan-900">Calculadora Lavado</h1>
            </div>

            <div className="max-w-md mx-auto space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-cyan-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-cyan-100 rounded-2xl text-cyan-600">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Peso del Niño</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Ingrese el peso en Kilogramos (kg)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Ej: 12.5"
                                    className="w-full p-4 text-2xl font-bold text-center border-2 border-cyan-200 rounded-2xl focus:border-cyan-500 focus:outline-none text-cyan-900 placeholder-cyan-200"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                    kg
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={calculate}
                            disabled={!weight}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2 ${weight
                                    ? 'bg-cyan-600 text-white hover:bg-cyan-700 active:scale-95'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <Calculator className="w-5 h-5" />
                            Calcular
                        </button>
                    </div>
                </div>

                {result !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 rounded-3xl shadow-xl border-2 border-cyan-400"
                    >
                        <h3 className="text-center text-gray-600 font-medium mb-2">Cantidad Recomendada</h3>
                        <div className="text-center mb-4">
                            <span className="text-5xl font-black text-cyan-600">{result} - {result * 2}</span>
                            <span className="text-xl text-gray-500 font-bold ml-2">ml</span>
                        </div>
                        <p className="text-center text-cyan-800 font-medium bg-cyan-50 py-2 rounded-lg">
                            por cada fosa nasal
                        </p>
                    </motion.div>
                )}

                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-2">
                            <p className="text-sm text-blue-900 font-medium">
                                ¿Cómo realizar el lavado?
                            </p>
                            <ul className="text-sm text-blue-800 space-y-1 list-disc pl-4">
                                <li>Use suero fisiológico tibio.</li>
                                <li>Incline la cabeza del niño hacia un lado.</li>
                                <li>Introduzca el suero con presión constante pero suave.</li>
                                <li>Repita en el otro lado.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
