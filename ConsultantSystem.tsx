
import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './lib/supabaseClient';
import { 
    BrandLogo, 
    MenuIcon, 
    CloseIcon, 
    UsersIcon, 
    ChartBarIcon, 
    UserCircleIcon, 
    LogoutIcon, 
    AcademicCapIcon, 
    ShoppingCartIcon, 
    PackageIcon, 
    TruckIcon, 
    TrendingUpIcon, 
    BanknotesIcon, 
    PresentationChartLineIcon, 
    CalendarIcon,
    QrCodeIcon, 
    CreditCardIcon, 
    DocumentDuplicateIcon, 
    CheckCircleIcon,
    PhotoIcon, 
    DownloadIcon, 
    ClipboardCopyIcon,
    HandshakeIcon, 
    TargetIcon,
    BriefcaseIcon,
    SunIcon,
    MoonIcon,
    UserPlusIcon,
    CurrencyDollarIcon,
    ClipboardListIcon,
    TagIcon,
    CalculatorIcon,
    VideoCameraIcon,
    PlayCircleIcon,
    BellIcon,
    LeafIcon,
    SparklesIcon,
    ShareIcon,
    ChatIcon,
    StoreIcon,
    WhatsAppIcon,
    LocationIcon,
    SearchIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon
} from './components/Icons';
import { Consultant, ConsultantStats, Sale, Notification, PrivateCustomer, PrivateSale } from './types';

// --- Theme Context ---
const ThemeContext = createContext({
    isDarkMode: false,
    toggleTheme: () => {}
});

const useTheme = () => useContext(ThemeContext);

// --- Global Floating Theme Toggle ---
const FloatingThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <button 
            onClick={toggleTheme} 
            className="fixed top-6 right-6 z-[60] p-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-110 transition-all duration-300 group"
            title="Alternar Tema"
        >
            {isDarkMode ? 
                <SunIcon className="h-6 w-6 text-yellow-400 drop-shadow-lg" /> : 
                <MoonIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 drop-shadow-lg" />
            }
        </button>
    );
};

// --- Helper Functions ---

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

// --- Components ---

const EarningsSimulator = () => {
    const [dailyGoal, setDailyGoal] = useState(4);
    const profitPerUnit = 17.50;
    const workingDays = 30;

    const calculateMonthly = (daily: number) => daily * profitPerUnit * workingDays;

    return (
        <div className="bg-white dark:bg-brand-dark-card rounded-[2rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700 animate-slide-up mt-8">
            <div className="flex items-start gap-4 mb-8">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400">
                    <CurrencyDollarIcon className="h-8 w-8" />
                </div>
                <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Simulador de Ganhos</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
                        Visualize o potencial do seu esforço. Pequenas metas diárias constroem grandes resultados mensais.
                        <span className="text-xs block mt-1 opacity-70">*Considerando 30 dias e lucro de R$ 17,50 por unidade.</span>
                    </p>
                </div>
            </div>

            {/* Static Examples Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[2, 5, 10].map((units) => (
                    <div key={units} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-green-500/30 transition-colors">
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Meta Diária</p>
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">
                            Vender <strong className="text-brand-green-mid">{units}</strong> pomadas
                        </p>
                        <hr className="border-gray-200 dark:border-gray-700 mb-4" />
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1">Ganho Mensal Estimado</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(calculateMonthly(units))}</p>
                    </div>
                ))}
            </div>

            {/* Interactive Slider Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-8">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quanto você quer ganhar este mês?</h4>
                    
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                         <span className="text-5xl md:text-6xl font-bold text-brand-green-mid tracking-tight">
                            {formatCurrency(calculateMonthly(dailyGoal))}
                        </span>
                        <div className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                             <span className="text-sm font-bold text-gray-600 dark:text-gray-300">~{dailyGoal} un/dia</span>
                             <span className="block text-[9px] text-gray-400 uppercase tracking-widest font-bold">Sua Meta</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-4">
                    <input
                        type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={dailyGoal}
                        onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-green-mid hover:accent-brand-green-dark transition-all"
                    />
                    <div className="flex justify-between mt-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <span>R$ 500</span>
                        <span>R$ 3.000</span>
                        <span>R$ 10.000+</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BusinessModelSection = () => {
    const [mode, setMode] = useState<'sales' | 'team'>('sales');

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-black text-white p-8 md:p-12 rounded-[2rem] flex flex-col lg:flex-row gap-12 items-center shadow-2xl overflow-hidden relative transition-all duration-500">
                {/* Background Glow Effect */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                {/* Left Content */}
                <div className="flex-1 space-y-8 relative z-10 w-full">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#1F2937] text-[#4ADE80] text-xs font-extrabold tracking-widest uppercase border border-[#374151]">
                        Modelo de Negócio
                    </span>
                    
                    <h2 className="text-4xl md:text-5xl font-serif font-bold leading-[1.1]">
                        Faça seu negócio <br />
                        <span className="text-[#4ADE80]">do seu jeito</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                        Liberdade total. Escolha entre lucro rápido com vendas diretas ou construa um legado duradouro formando sua própria equipe.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button 
                            onClick={() => setMode('sales')}
                            className={`flex items-center justify-center sm:justify-start gap-4 px-8 py-5 rounded-2xl font-bold transition-all duration-300 w-full sm:w-auto group ${
                                mode === 'sales' 
                                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105' 
                                : 'bg-[#1F2937] text-white hover:bg-[#374151] border border-[#374151]'
                            }`}
                        >
                            <ShoppingCartIcon className={`h-6 w-6 ${mode === 'sales' ? 'text-black' : 'text-[#4ADE80]'}`} />
                            <div className="text-left leading-tight">
                                <span className="block text-sm opacity-80 uppercase tracking-wider text-[10px]">Foco em</span>
                                <span className="text-lg">Venda Direta</span>
                            </div>
                        </button>
                        
                        <button 
                            onClick={() => setMode('team')}
                            className={`flex items-center justify-center sm:justify-start gap-4 px-8 py-5 rounded-2xl font-bold transition-all duration-300 w-full sm:w-auto group ${
                                mode === 'team' 
                                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105' 
                                : 'bg-[#1F2937] text-white hover:bg-[#374151] border border-[#374151]'
                            }`}
                        >
                            <UsersIcon className={`h-6 w-6 ${mode === 'team' ? 'text-black' : 'text-[#4ADE80]'}`} />
                            <div className="text-left leading-tight">
                                <span className="block text-sm opacity-80 uppercase tracking-wider text-[10px]">Foco em</span>
                                <span className="text-lg">Construção de Time</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Right Card */}
                <div className="flex-1 w-full max-w-md relative z-10">
                    <div className="bg-[#0F1115] p-8 rounded-[2rem] border border-[#1F2937] shadow-xl relative overflow-hidden h-full min-h-[420px] flex flex-col">
                        
                        {/* Top Tabs */}
                        <div className="flex bg-[#050608] p-1.5 rounded-xl mb-10 border border-[#1F2937]">
                            <button 
                                onClick={() => setMode('sales')}
                                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                                    mode === 'sales' 
                                    ? 'bg-white text-black shadow-md' 
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                Revenda
                            </button>
                            <button 
                                onClick={() => setMode('team')}
                                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                                    mode === 'team' 
                                    ? 'bg-white text-black shadow-md' 
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                Liderança
                            </button>
                        </div>

                        <div className="flex-1">
                            {mode === 'sales' ? (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="flex gap-5 group">
                                        <div className="bg-[#112918] p-4 rounded-2xl h-fit text-[#4ADE80] border border-[#1a3f24] group-hover:bg-[#1a3f24] transition-colors">
                                            <TagIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Lucro de 100%</h3>
                                            <p className="text-gray-400 leading-relaxed font-medium">Margem excepcional. Compre por R$ 17,50 e revenda por R$ 35,00.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 group">
                                        <div className="bg-[#112918] p-4 rounded-2xl h-fit text-[#4ADE80] border border-[#1a3f24] group-hover:bg-[#1a3f24] transition-colors">
                                            <TruckIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Pronta Entrega</h3>
                                            <p className="text-gray-400 leading-relaxed font-medium">Receba produtos em casa e atenda seus clientes com agilidade.</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="flex gap-5 group">
                                        <div className="bg-[#132238] p-4 rounded-2xl h-fit text-[#60A5FA] border border-[#1c304d] group-hover:bg-[#1c304d] transition-colors">
                                            <TrendingUpIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Bônus Recorrente</h3>
                                            <p className="text-gray-400 leading-relaxed font-medium">Receba comissões automáticas sobre todas as vendas da sua rede.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 group">
                                        <div className="bg-[#132238] p-4 rounded-2xl h-fit text-[#60A5FA] border border-[#1c304d] group-hover:bg-[#1c304d] transition-colors">
                                            <AcademicCapIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Carreira Executiva</h3>
                                            <p className="text-gray-400 leading-relaxed font-medium">Acesso a mentorias exclusivas e plano de carreira.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Earnings Simulator - Appears when Sales Mode is active */}
            {mode === 'sales' && <EarningsSimulator />}
        </div>
    );
};

const LoginScreen = ({ onLogin, onRegisterClick }: { onLogin: (user: Consultant) => void, onRegisterClick: () => void }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data: consultant, error: consultantError } = await supabase
                .from('consultants')
                .select('*')
                .eq('id', id)
                .single();

            if (consultantError || !consultant) {
                throw new Error('ID de consultor não encontrado.');
            }

            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: consultant.email,
                password: password,
            });

            if (authError) {
                throw new Error('Senha incorreta.');
            }

            onLogin(consultant as Consultant);

        } catch (err: any) {
            setError(err.message || 'Erro ao acessar o sistema.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-brand-dark-bg p-4 transition-colors duration-500 font-sans">
            <FloatingThemeToggle />
            
            <div className="bg-white dark:bg-brand-dark-card rounded-2xl shadow-2xl p-8 md:p-10 max-w-md w-full border-t-4 border-brand-green-dark relative z-10 animate-fade-in">
                <div className="flex flex-col items-center mb-8">
                    <BrandLogo className="h-16 w-auto mb-6 drop-shadow-sm" />
                    <h2 className="text-3xl font-serif font-extrabold text-brand-green-dark dark:text-white tracking-tight">Clube Brotos <span className="text-brand-green-mid">🌱</span></h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-base font-semibold">Área restrita para consultores.</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">ID de Consultor</label>
                        <input 
                            type="text" 
                            placeholder="Ex: 000000"
                            className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid focus:border-brand-green-mid outline-none transition-all placeholder-gray-400"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">Sua Senha</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid focus:border-brand-green-mid outline-none transition-all placeholder-gray-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm font-bold text-center bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</p>}
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-brand-green-dark hover:bg-brand-green-mid text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 uppercase tracking-wide text-sm"
                    >
                        {loading ? 'Entrando...' : 'Entrar no Sistema'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <span className="text-gray-400 text-sm font-medium">ou</span>
                </div>

                <div className="mt-6">
                     <button
                        onClick={onRegisterClick}
                        className="w-full bg-transparent border-2 border-brand-green-dark text-brand-green-dark dark:text-brand-green-mid dark:border-brand-green-mid font-bold py-3.5 rounded-lg hover:bg-brand-green-dark hover:text-white transition-all duration-200 uppercase tracking-wide text-sm"
                    >
                        Quero ser um Consultor
                    </button>
                </div>
            </div>
        </div>
    );
};

const ConsultantRegister = ({ onBack, onRegisterSuccess }: { onBack: () => void, onRegisterSuccess: () => void }) => {
    // State management for registration
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        cpf: '',
        cep: '',
        address: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            setLoading(false);
            return;
        }

        try {
            // 1. Create Auth User
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error("Erro ao criar usuário.");

            // 2. Generate ID (Simple simulation)
            const newId = Math.floor(100000 + Math.random() * 900000).toString();

            // 3. Insert into Consultants table
            const { error: dbError } = await supabase.from('consultants').insert([{
                id: newId,
                auth_id: authData.user.id,
                name: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp,
                document_id: formData.cpf,
                address: `${formData.address} - CEP: ${formData.cep}`,
                role: 'consultant'
            }]);

            if (dbError) throw dbError;

            alert(`Cadastro realizado com sucesso! Seu ID de acesso é: ${newId}`);
            onRegisterSuccess();

        } catch (err: any) {
            setError(err.message || 'Erro ao realizar cadastro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-brand-dark-bg p-4 transition-colors duration-500 font-sans">
             <FloatingThemeToggle />
             
            <div className="bg-white dark:bg-brand-dark-card rounded-2xl shadow-2xl p-8 md:p-10 max-w-2xl w-full border-t-4 border-brand-green-dark relative z-10 animate-fade-in my-10">
                <button onClick={onBack} className="absolute top-4 left-6 text-gray-400 hover:text-brand-green-dark transition-colors flex items-center font-medium">
                    ← Voltar para Login
                </button>

                <div className="flex flex-col items-center mb-8 mt-6">
                    <BrandLogo className="h-14 w-auto mb-4 drop-shadow-sm" />
                    <h2 className="text-3xl font-serif font-extrabold text-brand-green-dark dark:text-white tracking-tight">Cadastro de Consultor</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-base font-semibold">Preencha seus dados para iniciar.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    
                    <div className="space-y-4">
                        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b pb-2 mb-4">Dados Pessoais</h3>
                        <div>
                             <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">Nome Completo</label>
                            <input name="name" type="text" placeholder="Nome Completo" onChange={handleChange} required 
                                className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid outline-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">CPF</label>
                                <input name="cpf" type="text" placeholder="CPF" onChange={handleChange} required 
                                    className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">WhatsApp</label>
                                <input name="whatsapp" type="text" placeholder="WhatsApp" onChange={handleChange} required 
                                    className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">E-mail</label>
                            <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required 
                                className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid outline-none" />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b pb-2 mb-4">Localização</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className="md:col-span-1">
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">CEP</label>
                                <input name="cep" type="text" placeholder="CEP" onChange={handleChange} required 
                                    className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid outline-none" />
                             </div>
                             <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">Endereço Completo</label>
                                <input name="address" type="text" placeholder="Endereço Completo" onChange={handleChange} required 
                                    className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid outline-none" />
                             </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                         <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b pb-2 mb-4">Segurança</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">Senha</label>
                                <input name="password" type="password" placeholder="Senha" onChange={handleChange} required 
                                    className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">Confirmar Senha</label>
                                <input name="confirmPassword" type="password" placeholder="Confirmar Senha" onChange={handleChange} required 
                                    className="block w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 font-bold focus:ring-2 focus:ring-brand-green-mid outline-none" />
                            </div>
                         </div>
                    </div>

                    {error && <p className="text-red-500 text-sm font-bold text-center bg-red-50 p-2 rounded">{error}</p>}

                    <div className="pt-6">
                        <button type="submit" disabled={loading} className="w-full bg-brand-green-dark hover:bg-brand-green-mid text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 uppercase tracking-wide">
                            {loading ? 'Processando...' : 'Finalizar Cadastro'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

type DashboardShellProps = {
    consultant: Consultant;
    children?: React.ReactNode;
    onLogout: () => void;
};

const DashboardShell = ({ consultant, children, onLogout }: DashboardShellProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Passing the activeTab to children if they are valid React elements
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, { activeTab, setActiveTab });
        }
        return child;
    });

    const isDistributor = consultant.role === 'leader' || consultant.role === 'admin';

    // Main Menu Items
    const menuItems = [
        { id: 'overview', label: 'Visão Geral', icon: <ChartBarIcon /> },
        { id: 'materials', label: 'Materiais de Apoio', icon: <DocumentDuplicateIcon /> },
        { id: 'unibrotos', label: 'UniBrotos', icon: <AcademicCapIcon /> },
        { id: 'my_orders', label: 'Meus Pedidos', icon: <PackageIcon /> },
        { id: 'new_order', label: 'Fazer Pedido', icon: <ShoppingCartIcon /> },
    ];

    // Expansion Items
    const expansionItems = [
        { id: 'invite', label: 'Convidar Consultor', icon: <UserPlusIcon /> },
    ];

    // Distributor Only Items
    const distributorItems = [
        { id: 'business', label: 'Meu Negócio', icon: <BriefcaseIcon /> },
        { id: 'financial', label: 'Financeiro', icon: <BanknotesIcon /> },
    ];

    const renderMenuItem = (item: { id: string, label: string, icon: React.ReactNode }) => {
        const isActive = activeTab === item.id;
        const isNewOrder = item.id === 'new_order';
        
        return (
            <button
                key={item.id}
                onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-200 group ${
                    isActive 
                        ? 'bg-white text-[#2E5C31] shadow-lg transform scale-[1.02]' 
                        : 'text-white hover:bg-white/10'
                }`}
            >
                <div className={`transition-colors duration-200 ${
                    isActive 
                        ? 'text-[#2E5C31]' 
                        : (isNewOrder ? 'text-yellow-400' : 'text-white')
                }`}>
                    {item.icon}
                </div>
                <span className={`text-base ${isActive ? 'font-extrabold' : 'font-semibold'} ${!isActive && isNewOrder ? 'text-yellow-400' : ''}`}>
                    {item.label}
                </span>
            </button>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-brand-dark-bg font-sans transition-colors duration-500">
            <FloatingThemeToggle />

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-brand-green-dark z-50 px-4 py-3 flex items-center justify-between shadow-md">
                 <div className="bg-white rounded-lg p-1">
                    <BrandLogo className="h-8 w-auto" />
                 </div>
                 <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                     {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                 </button>
            </div>

            {/* Sidebar - Desktop & Mobile Drawer */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                bg-[#2E5C31] shadow-2xl overflow-y-auto
            `}>
                <div className="p-6 flex flex-col h-full">
                    {/* Brand Card - White Background as requested */}
                    <div className="bg-white rounded-2xl p-6 mb-6 relative shadow-lg">
                        <div className="flex justify-center">
                             <BrandLogo className="h-16 w-auto" />
                        </div>
                        {/* Mobile Close Button integrated in card */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="md:hidden absolute top-2 right-2 text-brand-green-dark hover:text-red-500 transition-colors"
                        >
                            <CloseIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* User Profile Card - Dark semi-transparent */}
                    <div className="bg-[#1F4224] rounded-2xl p-4 mb-2 flex items-center shadow-inner border border-[#2a5530]">
                        <div className="h-12 w-12 rounded-full bg-[#D4A373] flex items-center justify-center text-[#1F4224] font-bold text-xl mr-3 shrink-0 ring-2 ring-[#D4A373]/50">
                            {consultant.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="text-white font-bold text-sm truncate uppercase">{consultant.name}</h3>
                            <p className="text-gray-300 text-xs font-medium">ID: {consultant.id}</p>
                        </div>
                    </div>
                    
                    {/* Level Badge - Separate */}
                    <div className="bg-[#446b49] bg-opacity-40 rounded-lg py-2 px-4 mb-6 text-center border border-[#527a57]/30 backdrop-blur-sm">
                        <p className="text-white text-[10px] font-bold tracking-widest uppercase">
                            NÍVEL: {consultant.role === 'admin' ? 'ADMINISTRADOR' : (isDistributor ? 'LÍDER/DISTRIBUIDOR' : 'CONSULTOR')}
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map(renderMenuItem)}

                        {/* Divider */}
                        <div className="py-2">
                            <hr className="border-[#446b49]/50" />
                        </div>

                        {/* Expansion Section Header */}
                        <p className="text-gray-300/60 text-[10px] font-bold uppercase tracking-widest px-6 pt-2 pb-1">EXPANSÃO</p>
                        
                        {expansionItems.map(renderMenuItem)}
                        
                        {/* Distributor Section */}
                        {isDistributor && (
                            <>
                                {distributorItems.map(renderMenuItem)}
                            </>
                        )}
                    </nav>

                    {/* Logout Footer */}
                    <div className="pt-6 mt-4 border-t border-[#446b49]/30">
                        <button 
                            onClick={onLogout}
                            className="flex items-center space-x-3 text-[#d4a373] hover:text-white transition-colors w-full px-6 group"
                        >
                            <LogoutIcon className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Sair do Sistema</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto pt-16 md:pt-0 bg-gray-50 dark:bg-brand-dark-bg p-4 md:p-8">
                 {childrenWithProps}
            </main>
        </div>
    );
};

const Dashboard = ({ activeTab, setActiveTab, consultant }: { activeTab?: string, setActiveTab?: (tab: string) => void, consultant: Consultant }) => {
    // Determine content based on activeTab
    const isDistributor = consultant.role === 'leader' || consultant.role === 'admin';

    // State for Materials Filter
    const [materialCategory, setMaterialCategory] = useState('Todos');
    const materialsCategories = ['Todos', 'Produtos', 'Empresa', 'Textos Prontos', 'Promoções'];

    // Mock Materials
    const mockMaterials = [
        { id: 1, title: 'IMAGEM PARA STORY', category: 'Produtos', type: 'image' },
        { id: 2, title: 'TEXTO DE VENDAS', category: 'Textos Prontos', type: 'text' },
        { id: 3, title: 'BANNER PROMO', category: 'Promoções', type: 'image' },
        { id: 4, title: 'LOGO MARCA', category: 'Empresa', type: 'image' },
        { id: 5, title: 'CATÁLOGO 2025', category: 'Produtos', type: 'pdf' },
        { id: 6, title: 'STORY BOM DIA', category: 'Textos Prontos', type: 'image' },
    ];

    const filteredMaterials = materialCategory === 'Todos' ? mockMaterials : mockMaterials.filter(m => m.category === materialCategory);

    // Mock Team Data for Business Tab
    const teamMembers = [
        { id: '102030', name: 'Maria Silva', role: 'Consultor', status: 'Ativo', sales: 'R$ 850,00', phone: '5511999999999' },
        { id: '102031', name: 'João Santos', role: 'Consultor', status: 'Ativo', sales: 'R$ 1.200,00', phone: '5511988888888' },
        { id: '102032', name: 'Ana Costa', role: 'Consultor', status: 'Inativo', sales: 'R$ 0,00', phone: '5511977777777' },
        { id: '102033', name: 'Pedro Alves', role: 'Líder', status: 'Ativo', sales: 'R$ 3.450,00', phone: '5511966666666' },
        { id: '102034', name: 'Carla Lima', role: 'Consultor', status: 'Ativo', sales: 'R$ 525,00', phone: '5511955555555' },
        { id: '102035', name: 'Marcos Rocha', role: 'Consultor', status: 'Inativo', sales: 'R$ 0,00', phone: '5511944444444' },
    ];

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
             {activeTab === 'overview' && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-serif font-bold text-brand-green-dark dark:text-gray-100">
                            Olá, {consultant.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    </div>

                    {/* New Business Model Section (Replacing Old Campaign) */}
                    <BusinessModelSection />
                </div>
             )}

             {activeTab === 'materials' && (
                 <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-2xl text-pink-500">
                                <PhotoIcon className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-brand-green-dark dark:text-white">Materiais de Apoio</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Acervo de marketing para suas redes sociais.</p>
                            </div>
                        </div>
                        <button className="bg-[#064e3b] hover:bg-[#064e3b]/90 text-white font-bold py-2.5 px-6 rounded-lg text-sm shadow-lg transition-transform hover:scale-105">
                            + Novo Material
                        </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
                        {materialsCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setMaterialCategory(cat)}
                                className={`px-5 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${
                                    materialCategory === cat
                                    ? 'bg-[#064e3b] text-white border-[#064e3b]'
                                    : 'bg-white dark:bg-brand-dark-card text-gray-500 border-gray-200 dark:border-gray-700 hover:border-[#064e3b] hover:text-[#064e3b]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Materials Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredMaterials.map((material) => (
                            <div key={material.id} className="bg-white dark:bg-brand-dark-card rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow group relative">
                                {/* Gray Placeholder Area */}
                                <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                                    <PhotoIcon className="h-12 w-12 text-gray-300" />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button className="bg-white text-[#064e3b] font-bold py-2 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            Baixar
                                        </button>
                                    </div>
                                    <button className="absolute bottom-4 right-4 bg-red-50 text-red-500 p-1.5 rounded-full hover:bg-red-100 transition-colors">
                                        <CloseIcon className="h-4 w-4" />
                                    </button>
                                </div>
                                
                                {/* Footer Info */}
                                <div className="p-5">
                                    <h3 className="text-xs font-extrabold text-[#064e3b] dark:text-white uppercase tracking-wide mb-1">
                                        {material.title}
                                    </h3>
                                    <span className="text-[10px] font-bold text-brand-green-mid uppercase tracking-widest">
                                        {material.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
             )}

             {activeTab === 'unibrotos' && (
                 <div className="bg-white dark:bg-brand-dark-card rounded-2xl shadow-sm p-8">
                     <h2 className="text-2xl font-bold mb-6 text-brand-green-dark dark:text-white">UniBrotos</h2>
                     <p className="text-gray-500">Plataforma de treinamento...</p>
                 </div>
             )}

             {activeTab === 'my_orders' && (
                 <div className="space-y-8">
                    <div className="bg-white dark:bg-brand-dark-card rounded-2xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold mb-8 text-brand-green-dark dark:text-white">Meus Pedidos</h2>

                        {/* Stats Grid - Moved from Overview */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${isDistributor ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 mb-8`}>
                            <div className="bg-white dark:bg-brand-dark-card p-6 rounded-2xl shadow-sm border-l-4 border-brand-green-mid hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Vendas Mês</p>
                                        <h3 className="text-2xl font-bold text-brand-green-dark dark:text-white mt-1">R$ 1.260,00</h3>
                                    </div>
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                                        <TrendingUpIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-brand-dark-card p-6 rounded-2xl shadow-sm border-l-4 border-brand-earth hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Pontos</p>
                                        <h3 className="text-2xl font-bold text-brand-earth mt-1">300 pts</h3>
                                        <span className="text-[10px] text-gray-400 font-medium mt-1 block">100 pts/caixa</span>
                                    </div>
                                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                                        <SparklesIcon className="h-6 w-6 text-brand-earth" />
                                    </div>
                                </div>
                            </div>
                             {isDistributor && (
                                <div 
                                    onClick={() => setActiveTab && setActiveTab('business')}
                                    className="bg-white dark:bg-brand-dark-card p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Equipe</p>
                                            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">12 Membros</h3>
                                        </div>
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                                            <UsersIcon />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="bg-white dark:bg-brand-dark-card p-6 rounded-2xl shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Lucro Est.</p>
                                        <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">R$ 630,00</h3>
                                    </div>
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                        <BanknotesIcon />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-500">Histórico de pedidos...</p>
                    </div>
                 </div>
             )}

             {activeTab === 'new_order' && (
                 <div className="bg-white dark:bg-brand-dark-card rounded-2xl shadow-sm p-8">
                     <h2 className="text-2xl font-bold mb-6 text-brand-green-dark dark:text-white">Fazer Pedido</h2>
                     <p className="text-gray-500">Catálogo de produtos...</p>
                 </div>
             )}
             
             {activeTab === 'invite' && (
                 <div className="bg-white dark:bg-brand-dark-card rounded-2xl shadow-sm p-8">
                     <h2 className="text-2xl font-bold mb-6 text-brand-green-dark dark:text-white">Convidar Consultor</h2>
                     <p className="text-gray-500">Link de cadastro e convites...</p>
                 </div>
             )}

             {activeTab === 'business' && (
                 <div className="bg-white dark:bg-brand-dark-card rounded-2xl shadow-sm p-8">
                     <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-brand-green-dark dark:text-white">Meu Negócio</h2>
                            <p className="text-gray-500 text-sm mt-1">Gerenciamento completo da sua equipe.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold uppercase">Total Consultores</p>
                                <p className="text-xl font-bold text-gray-800 dark:text-white">125</p>
                            </div>
                            <div className="text-right border-l pl-4 border-gray-200 dark:border-gray-700">
                                <p className="text-xs text-gray-400 font-bold uppercase">Ativos Hoje</p>
                                <p className="text-xl font-bold text-brand-green-mid">12</p>
                            </div>
                        </div>
                     </div>
                     
                     {/* Team Table */}
                     <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="py-4 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Consultor</th>
                                    <th className="py-4 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="py-4 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Nível</th>
                                    <th className="py-4 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="py-4 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Vendas (Mês)</th>
                                    <th className="py-4 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map((member) => (
                                    <tr key={member.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-4 px-2 flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                                                {member.name.charAt(0)}
                                            </div>
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">{member.name}</span>
                                        </td>
                                        <td className="py-4 px-2 text-sm text-gray-500">{member.id}</td>
                                        <td className="py-4 px-2 text-sm">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${member.role === 'Líder' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {member.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-sm">
                                             <span className={`flex items-center gap-1.5 ${member.status === 'Ativo' ? 'text-green-600' : 'text-red-500'}`}>
                                                <span className={`h-2 w-2 rounded-full ${member.status === 'Ativo' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {member.status}
                                             </span>
                                        </td>
                                        <td className="py-4 px-2 text-sm font-bold text-gray-700 dark:text-gray-300">{member.sales}</td>
                                        <td className="py-4 px-2 text-right">
                                            <button className="text-green-600 hover:text-green-700 p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                                                <WhatsAppIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                 </div>
             )}

             {activeTab === 'financial' && (
                 <div className="bg-white dark:bg-brand-dark-card rounded-2xl shadow-sm p-8">
                     <h2 className="text-2xl font-bold mb-6 text-brand-green-dark dark:text-white">Financeiro</h2>
                     <p className="text-gray-500">Extrato, bônus e saques...</p>
                 </div>
             )}
        </div>
    );
};

export const ConsultantApp = () => {
    const [user, setUser] = useState<Consultant | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);

    // Persist login state check
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                 const { data: consultant } = await supabase
                    .from('consultants')
                    .select('*')
                    .eq('auth_id', session.user.id)
                    .single();
                 if (consultant) setUser(consultant as Consultant);
            }
        };
        checkUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    if (user) {
        return (
            <DashboardShell consultant={user} onLogout={handleLogout}>
                <Dashboard consultant={user} />
            </DashboardShell>
        );
    }

    if (isRegistering) {
        return <ConsultantRegister onBack={() => setIsRegistering(false)} onRegisterSuccess={() => setIsRegistering(false)} />;
    }

    return <LoginScreen onLogin={setUser} onRegisterClick={() => setIsRegistering(true)} />;
};
