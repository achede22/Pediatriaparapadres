import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { EmergenciaNoMedico } from './components/EmergenciaNoMedico';
import { NoEmergenciaNoMedico } from './components/NoEmergenciaNoMedico';
import { Switch } from './components/ui/switch';

type Screen = 'home' | 'emergencia' | 'no-emergencia';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isEmergencia, setIsEmergencia] = useState(false);

  const handleContinuar = () => {
    if (isEmergencia) {
      setCurrentScreen('emergencia');
    } else {
      setCurrentScreen('no-emergencia');
    }
  };

  const handleGoBack = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' ? (
          <motion.div
            key="home"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <h1 className="text-center text-blue-600 mb-4">
                PediatrIA
              </h1>
              <p className="text-center text-gray-600 mb-12">
                Guía de Salud Pediátrica para Padres y Cuidadores
              </p>
              
              <div className="space-y-8 mb-12">
                {/* Switch: ¿Es emergencia? */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-300 transition-all hover:border-red-400 shadow-lg">
                  <div className="flex flex-col items-center gap-6">
                    <label htmlFor="emergencia-switch" className="cursor-pointer text-center">
                      <span className="block mb-3 text-gray-600">Tipo de situación:</span>
                      <span className="block">¿Es una emergencia?</span>
                    </label>
                    <div className="flex items-center gap-6">
                      <span className={`${isEmergencia ? 'text-gray-400' : 'text-green-600'}`}>
                        NO
                      </span>
                      <Switch
                        id="emergencia-switch"
                        checked={isEmergencia}
                        onCheckedChange={setIsEmergencia}
                        className="scale-[2] data-[state=checked]:bg-red-600"
                      />
                      <span className={`${isEmergencia ? 'text-red-600' : 'text-gray-400'}`}>
                        SÍ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón Continuar */}
              <button
                onClick={handleContinuar}
                className="w-full py-6 px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl 
                         shadow-lg hover:shadow-xl active:scale-95 transition-all duration-150
                         hover:from-blue-700 hover:to-blue-800"
              >
                Continuar
              </button>

              {/* Disclaimer */}
              <div className="mt-8 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                <p className="text-center text-gray-600">
                  Esta aplicación es solo informativa. Consulte siempre con un profesional de la salud.
                </p>
              </div>
            </div>
          </motion.div>
        ) : currentScreen === 'emergencia' ? (
          <EmergenciaNoMedico key="emergencia" onGoBack={handleGoBack} />
        ) : (
          <NoEmergenciaNoMedico key="no-emergencia" onGoBack={handleGoBack} />
        )}
      </AnimatePresence>
    </div>
  );
}
