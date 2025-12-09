import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, AlertCircle, Heart, Flame, Droplet, Bone, Zap, Phone } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type Guide = 'main' | 'atragantamiento' | 'quemaduras' | 'heridas' | 'fracturas' | 'convulsiones' | 'rcp';

export default function ParentEmergency() {
    const [currentGuide, setCurrentGuide] = useState<Guide>('main');

    const guias = [
        { id: 'atragantamiento', nombre: 'Atragantamiento', icon: AlertCircle, color: 'red' },
        { id: 'quemaduras', nombre: 'Quemaduras', icon: Flame, color: 'orange' },
        { id: 'heridas', nombre: 'Heridas', icon: Droplet, color: 'red' },
        { id: 'fracturas', nombre: 'Fracturas', icon: Bone, color: 'blue' },
        { id: 'convulsiones', nombre: 'Convulsiones', icon: Zap, color: 'purple' },
        { id: 'rcp', nombre: 'RCP Básica', icon: Heart, color: 'pink' },
    ];

    const renderGuiaDetalle = (id: Guide) => {
        const guias: any = {
            'atragantamiento': {
                titulo: 'Atragantamiento',
                imagen: 'https://images.unsplash.com/photo-1542913019-7341c3d3f4d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGNob2tpbmclMjBoZWltbGljaHxlbnwxfHx8fDE3NjM3NjE1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
                importante: '¡Si el niño puede toser, llorar o hablar, NO interfiera! Anímelo a toser.',
                pasos: [
                    {
                        titulo: 'Para bebés menores de 1 año:',
                        contenido: [
                            'Coloque al bebé boca abajo sobre su antebrazo',
                            'Dé 5 golpes firmes entre los omóplatos con el talón de la mano',
                            'Voltee al bebé boca arriba',
                            'Dé 5 compresiones en el centro del pecho con dos dedos',
                            'Repita hasta que el objeto salga o el bebé pierda el conocimiento',
                        ]
                    },
                    {
                        titulo: 'Para niños mayores de 1 año:',
                        contenido: [
                            'Párese detrás del niño',
                            'Coloque su puño cerrado justo arriba del ombligo',
                            'Agarre el puño con la otra mano',
                            'Dé compresiones rápidas hacia adentro y hacia arriba',
                            'Repita hasta que el objeto salga o el niño pierda el conocimiento',
                        ]
                    },
                    {
                        titulo: 'Si el niño pierde el conocimiento:',
                        contenido: [
                            'Llame al 911 inmediatamente',
                            'Inicie RCP (vea la guía de RCP básica)',
                        ]
                    }
                ]
            },
            'quemaduras': {
                titulo: 'Quemaduras',
                imagen: 'https://images.unsplash.com/photo-1726621380962-d23f3dde9151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGJ1cm4lMjBpbmp1cnl8ZW58MXx8fHwxNzYzNzYxNTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
                importante: 'NUNCA aplique hielo, mantequilla, pasta dental o remedios caseros.',
                pasos: [
                    {
                        titulo: 'Pasos inmediatos:',
                        contenido: [
                            'Aleje al niño de la fuente de calor',
                            'Retire ropa y joyas de la zona afectada (si no está pegada a la piel)',
                            'Enfríe la quemadura con agua corriente tibia (NO fría) por 10-20 minutos',
                            'NO rompa las ampollas',
                        ]
                    },
                    {
                        titulo: 'Cubrir la quemadura:',
                        contenido: [
                            'Use un paño limpio y húmedo',
                            'Si es posible, use gasa estéril',
                            'NO aplique presión',
                        ]
                    },
                    {
                        titulo: 'Llame al 911 si:',
                        contenido: [
                            'La quemadura es más grande que la palma de la mano del niño',
                            'Está en cara, manos, pies, genitales o articulaciones',
                            'La piel se ve blanca o carbonizada',
                            'El niño tiene menos de 5 años',
                            'Es causada por electricidad o químicos',
                        ]
                    }
                ]
            },
            'heridas': {
                titulo: 'Heridas',
                imagen: 'https://images.unsplash.com/photo-1758575514478-2cbf66f110aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHdvdW5kJTIwYmFuZGFnZXxlbnwxfHx8fDE3NjM3NjE1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                importante: 'Use guantes o proteja sus manos para evitar contacto directo con la sangre.',
                pasos: [
                    {
                        titulo: 'Control de sangrado:',
                        contenido: [
                            'Aplique presión directa con un paño limpio',
                            'Mantenga la presión durante 5-10 minutos sin levantar',
                            'Si el paño se empapa, agregue más encima (no retire el primero)',
                            'Eleve la parte lesionada por encima del corazón si es posible',
                        ]
                    },
                    {
                        titulo: 'Limpieza (solo heridas menores):',
                        contenido: [
                            'Lávese las manos',
                            'Enjuague suavemente con agua limpia',
                            'No use alcohol ni agua oxigenada en heridas profundas',
                        ]
                    },
                    {
                        titulo: 'Cubrir la herida:',
                        contenido: [
                            'Use gasa estéril o paño limpio',
                            'Asegure con vendaje (no muy apretado)',
                        ]
                    },
                    {
                        titulo: 'Llame al 911 si:',
                        contenido: [
                            'El sangrado no se detiene después de 10 minutos de presión',
                            'La herida es profunda o extensa',
                            'Puede ver hueso, músculo o grasa',
                            'Es una herida punzante profunda',
                            'Fue causada por mordedura de animal o humano',
                        ]
                    }
                ]
            },
            'fracturas': {
                titulo: 'Fracturas',
                imagen: 'https://images.unsplash.com/photo-1762347920674-13d8bca6cbb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGJvbmUlMjBmcmFjdHVyZXxlbnwxfHx8fDE3NjM3NjE1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                importante: 'NO intente enderezar el hueso. NO mueva al niño si sospecha lesión de cuello o espalda.',
                pasos: [
                    {
                        titulo: 'Inmovilizar:',
                        contenido: [
                            'NO mueva la parte lesionada',
                            'Estabilice en la posición en que se encuentra',
                            'Use materiales rígidos como férulas improvisadas (revista, cartón)',
                            'Coloque almohadillas suaves entre la férula y la piel',
                            'Asegure con vendajes (NO demasiado apretado)',
                        ]
                    },
                    {
                        titulo: 'Control del dolor:',
                        contenido: [
                            'Mantenga al niño tranquilo y cómodo',
                            'Puede aplicar hielo envuelto en una toalla (15 min, descanso 15 min)',
                            'NO dé alimentos ni bebidas (puede necesitar cirugía)',
                        ]
                    },
                    {
                        titulo: 'Llame al 911 si:',
                        contenido: [
                            'La extremidad está deformada',
                            'Hay pérdida de sensibilidad o movimiento',
                            'La piel está fría, pálida o azulada',
                            'Sospecha fractura de cuello, espalda, cadera o pelvis',
                            'El hueso perfora la piel',
                        ]
                    }
                ]
            },
            'convulsiones': {
                titulo: 'Convulsiones',
                imagen: 'https://images.unsplash.com/photo-1620875638370-8957e4dbd830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwaW5mYW50JTIwY3ByfGVufDF8fHx8MTc2Mzc2MTU1NHww&ixlib=rb-4.1.0&q=80&w=1080',
                importante: 'NO ponga nada en la boca del niño. NO intente sujetar o restringir los movimientos.',
                pasos: [
                    {
                        titulo: 'Durante la convulsión:',
                        contenido: [
                            'Mantenga la calma',
                            'Coloque al niño en el suelo o superficie plana',
                            'Gire suavemente al niño de lado',
                            'Retire objetos peligrosos cercanos',
                            'Coloque algo suave bajo su cabeza',
                            'Afloje ropa ajustada alrededor del cuello',
                            'Registre la duración de la convulsión',
                        ]
                    },
                    {
                        titulo: 'Después de la convulsión:',
                        contenido: [
                            'Mantenga al niño de lado (posición de recuperación)',
                            'Revise si respira normalmente',
                            'Manténgase con el niño hasta que esté completamente alerta',
                            'El niño puede estar confundido - tranquilícelo',
                        ]
                    },
                    {
                        titulo: 'Llame al 911 si:',
                        contenido: [
                            'Es la primera convulsión del niño',
                            'Dura más de 5 minutos',
                            'Tiene convulsiones repetidas',
                            'No recupera la conciencia',
                            'Tiene dificultad para respirar',
                            'Se lesionó durante la convulsión',
                            'La convulsión ocurrió en el agua',
                        ]
                    }
                ]
            },
            'rcp': {
                titulo: 'RCP Básica',
                imagen: 'https://images.unsplash.com/photo-1620875638370-8957e4dbd830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwaW5mYW50JTIwY3ByfGVufDF8fHx8MTc2Mzc2MTU1NHww&ixlib=rb-4.1.0&q=80&w=1080',
                importante: 'Si hay otra persona, pídale que llame al 911 mientras usted inicia RCP. Si está solo, haga RCP por 2 minutos antes de llamar.',
                pasos: [
                    {
                        titulo: '1. Verificar respuesta:',
                        contenido: [
                            'Toque al niño y grite su nombre',
                            'Si no responde, continúe',
                        ]
                    },
                    {
                        titulo: '2. Pedir ayuda:',
                        contenido: [
                            'Grite para pedir ayuda',
                            'Si alguien llega, pídale que llame al 911',
                        ]
                    },
                    {
                        titulo: '3. Posición:',
                        contenido: [
                            'Coloque al niño boca arriba en superficie firme',
                            'Arrodíllese al lado del niño',
                        ]
                    },
                    {
                        titulo: '4. Compresiones (30 veces):',
                        contenido: [
                            'BEBÉS: Use dos dedos en el centro del pecho',
                            'NIÑOS: Use una o dos manos en el centro del pecho',
                            'Presione fuerte y rápido (100-120 veces por minuto)',
                            'Profundidad: 1/3 del grosor del pecho',
                            'Deje que el pecho suba completamente entre compresiones',
                        ]
                    },
                    {
                        titulo: '5. Respiraciones (2 veces):',
                        contenido: [
                            'Incline suavemente la cabeza hacia atrás',
                            'Levante el mentón',
                            'Tape la nariz (o cubra nariz y boca en bebés)',
                            'Dé 2 respiraciones boca a boca de 1 segundo cada una',
                            'El pecho debe elevarse visiblemente',
                        ]
                    },
                    {
                        titulo: '6. Continuar:',
                        contenido: [
                            'Repita ciclos de 30 compresiones y 2 respiraciones',
                            'No se detenga hasta que:',
                            '  - El niño comience a respirar',
                            '  - Llegue ayuda médica',
                            '  - Esté demasiado exhausto para continuar',
                        ]
                    }
                ]
            }
        };

        const guia = guias[id];
        return (
            <div className="space-y-6">
                {/* Imagen ilustrativa */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                    <ImageWithFallback
                        src={guia.imagen}
                        alt={guia.titulo}
                        className="w-full h-64 object-cover"
                    />
                </div>

                <div className="bg-red-100 border-2 border-red-400 rounded-xl p-5">
                    <p className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <span className="text-red-900 font-bold">{guia.importante}</span>
                    </p>
                </div>

                {guia.pasos.map((seccion: any, index: number) => (
                    <div key={index} className="bg-white rounded-xl p-6 border-2 border-gray-200">
                        <h3 className="text-blue-600 mb-4 font-bold text-lg">{seccion.titulo}</h3>
                        <ul className="space-y-3">
                            {seccion.contenido.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                                    <span className="flex-1 text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6 pb-24"
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-red-600 text-white rounded-2xl p-6 mb-6 shadow-xl">
                    <div className="flex items-center gap-4 mb-2">
                        <button
                            onClick={() => currentGuide === 'main' ? window.history.back() : setCurrentGuide('main')}
                            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl active:scale-95 transition-all"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="flex-1">
                            <h1 className="text-white font-bold text-2xl">EMERGENCIA</h1>
                            <p className="text-red-100">Guía para Padres y Cuidadores</p>
                        </div>
                        <AlertCircle className="w-12 h-12" />
                    </div>
                </div>

                {currentGuide === 'main' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        {/* Mensaje importante */}
                        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-6 mb-6">
                            <div className="flex items-start gap-4">
                                <AlertCircle className="w-8 h-8 text-yellow-700 flex-shrink-0" />
                                <div>
                                    <h3 className="text-yellow-900 mb-2 font-bold">¡IMPORTANTE!</h3>
                                    <p className="text-yellow-900">
                                        Si tiene dudas sobre la gravedad de la situación, llame al 911 de inmediato.
                                        Es mejor prevenir que lamentar.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Botón de emergencia principal */}
                        <a
                            href="tel:911"
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-2xl shadow-lg 
                       hover:shadow-xl active:scale-98 transition-all flex items-center gap-4 justify-center mb-6"
                        >
                            <Phone className="w-10 h-10" />
                            <div className="text-left">
                                <p className="text-red-100 text-lg">Llamada de Emergencia</p>
                                <p className="text-white text-3xl font-bold">911</p>
                            </div>
                        </a>

                        <h2 className="text-gray-700 mb-4 font-bold text-xl">Guías de Primeros Auxilios:</h2>

                        {/* Guías */}
                        {guias.map((guia) => (
                            <button
                                key={guia.id}
                                onClick={() => setCurrentGuide(guia.id as Guide)}
                                className="w-full bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all
                         border-2 border-gray-200 hover:border-red-400 flex items-center gap-4"
                            >
                                <div className={`w-16 h-16 bg-${guia.color}-100 rounded-xl flex items-center justify-center`}>
                                    <guia.icon className={`w-8 h-8 text-${guia.color}-600`} />
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="text-gray-900 font-bold text-lg">{guia.nombre}</h3>
                                    <p className="text-gray-600">Instrucciones paso a paso</p>
                                </div>
                            </button>
                        ))}

                        {/* Números de emergencia */}
                        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-blue-200 mt-6">
                            <h3 className="text-blue-600 mb-4 font-bold text-lg">Números de Emergencia</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                    <span className="font-medium text-blue-900">Ambulancia / Emergencias</span>
                                    <a href="tel:911" className="px-6 py-2 bg-blue-600 text-white rounded-lg active:scale-95 transition-all font-bold">
                                        911
                                    </a>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="mb-2 font-bold text-gray-700">Qué decir al llamar al 911:</p>
                                    <ul className="space-y-1 text-gray-600">
                                        <li>• Su ubicación exacta</li>
                                        <li>• Qué sucedió</li>
                                        <li>• Edad del niño</li>
                                        <li>• Estado actual (¿respira?, ¿está consciente?)</li>
                                        <li>• NO cuelgue hasta que se lo indiquen</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentGuide !== 'main' && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 rounded-2xl p-6 shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                onClick={() => setCurrentGuide('main')}
                                className="p-3 bg-white hover:bg-gray-100 rounded-xl active:scale-95 transition-all shadow"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h2 className="flex-1 text-red-600 font-bold text-xl">{guias.find(g => g.id === currentGuide)?.nombre}</h2>
                        </div>

                        {renderGuiaDetalle(currentGuide)}

                        {/* Botón de emergencia al final */}
                        <a
                            href="tel:911"
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl shadow-lg 
                       hover:shadow-xl active:scale-98 transition-all flex items-center gap-4 justify-center mt-6"
                        >
                            <Phone className="w-8 h-8" />
                            <span className="font-bold text-lg">Llamar al 911</span>
                        </a>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
