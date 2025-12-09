import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Heart, Stethoscope, Baby, Calculator, AlertCircle, BookOpen, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { ContactModal } from '../components/ContactModal';

export default function ParentHome() {
    const navigate = useNavigate();
    const [isContactOpen, setIsContactOpen] = useState(false);

    const menuItems = [
        {
            title: 'Ingresar Síntomas 🤒',
            description: 'Guía para describir qué siente tu hijo',
            icon: Stethoscope,
            color: 'blue',
            path: '/symptoms',
        },
        {
            title: 'Calculadora Lavado 💧',
            description: 'Prepara la solución salina exacta',
            icon: Calculator,
            color: 'cyan',
            path: '/nasal-calc',
        },
        {
            title: 'Información Padres 📚',
            description: 'Consejos de cuidado, vacunas y más',
            icon: BookOpen,
            color: 'green',
            path: '/parent-info',
        },
        {
            title: 'Emergencia 🚑',
            description: 'Guías rápidas de primeros auxilios',
            icon: AlertCircle,
            color: 'red',
            path: '/emergency-parent',
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 pb-24"
        >
            <div className="max-w-md mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-2 pt-8">
                    <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
                        <Baby className="w-12 h-12 text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Pediatría para Padres 👶
                    </h1>
                    <p className="text-gray-700 font-medium">
                        Cuidando la salud de tus hijos, paso a paso. ✨
                    </p>
                </div>

                {/* Menu Grid */}
                <div className="grid gap-6">
                    {menuItems.map((item, index) => (
                        <motion.button
                            key={item.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(item.path)}
                            className={`group relative overflow-hidden bg-${item.color}-100 rounded-3xl shadow-lg hover:shadow-xl transition-all active:scale-98 text-left h-32 flex items-center border-2 border-${item.color}-200`}
                        >
                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-5 p-6 w-full">
                                <div className={`p-4 bg-white rounded-2xl shadow-sm text-${item.color}-600`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-800 font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Contacto / Sugerencias */}
                <motion.button
                    onClick={() => setIsContactOpen(true)}
                    animate={{
                        rotate: [0, -5, 5, -5, 5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                    }}
                    className="w-full mt-4 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 transition-colors py-4 bg-white/50 rounded-2xl border border-gray-100 shadow-sm"
                >
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-medium">Sugerencias y Reportes</span>
                </motion.button>

                {/* Footer Info */}
                <div className="text-center text-sm text-gray-500 mt-12 font-medium">
                    <p>Esta aplicación es una guía informativa. ℹ️</p>
                    <p>Ante cualquier duda, consulte a su médico. 👨‍⚕️</p>
                </div>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </motion.div>
    );
}
