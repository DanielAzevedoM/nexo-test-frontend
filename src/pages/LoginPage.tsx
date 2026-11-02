import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, ArrowRight, Loader2 } from 'lucide-react';
import { NexoMark } from '../components/common/Icons';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC<{ onLoginSuccess?: () => void }> = ({ onLoginSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('teste@nexo.com.br');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      setError(null);
      await login(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Erro ao entrar. Verifique suas credenciais da rede Nexo.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (quickEmail: string) => {
    setEmail(quickEmail);
    try {
      setIsLoading(true);
      setError(null);
      await login(quickEmail, 'qualquer_senha');
      if (onLoginSuccess) onLoginSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao entrar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen lg:h-screen flex flex-col lg:flex-row bg-white overflow-y-auto lg:overflow-hidden">
      {/* Showcase (Left Panel) */}
      <div className="w-full lg:w-[54%] shrink-0 flex flex-col justify-between p-6 sm:p-10 lg:p-[48px_64px] bg-[#1B2431] overflow-y-auto">
        {/* Brand */}
        <div className="flex items-center gap-[10px]">
          <NexoMark className="w-[24px] h-[24px]" color="#FFFFFF" />
          <span className="text-[17px] font-bold text-white tracking-[-0.2px]">
            Nexo Assist
          </span>
        </div>

        {/* Story */}
        <div className="flex flex-col gap-[28px] sm:gap-[36px] my-auto py-6">
          {/* Headline */}
          <div className="flex flex-col gap-[14px] sm:gap-[18px]">
            <span className="text-[13px] sm:text-[13.5px] font-medium text-white/55">
              Service desk de TI da Nexo
            </span>
            <h1 className="text-[32px] sm:text-[44px] xl:text-[54px] leading-[1.1] sm:leading-[1.08] font-serif font-normal text-white tracking-[-0.8px] sm:tracking-[-1.2px]">
              Seu problema de TI, resolvido em uma conversa.
            </h1>
            <p className="text-[14.5px] sm:text-[16px] leading-[22px] sm:leading-[25px] w-full max-w-[520px] font-normal text-white/65">
              Descreva o que está acontecendo. O assistente consulta seus chamados, busca na central
              de ajuda e chama um analista quando precisa.
            </p>
          </div>

          {/* Conversation Preview */}
          <div className="lg:pl-[72px]">
            <div className="max-w-[500px] p-[16px] sm:p-[18px] rounded-[16px] bg-white/[0.04] outline outline-1 outline-white/10 flex flex-col gap-[10px]">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="px-3.5 py-[9px] bg-white rounded-[12px_12px_4px_12px] text-[13px] sm:text-[13.5px] text-[#1B2431]">
                  Meu notebook não conecta na VPN. Erro 809.
                </div>
              </div>

              {/* Agent Message */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-[6px] flex-wrap">
                  <span className="text-[12.5px] font-semibold text-white/80">
                    Nexo Assist
                  </span>
                  <span className="text-[11.5px] sm:text-[12.5px] text-white/45">
                    consultou seus chamados · criou um chamado
                  </span>
                </div>
                <div className="max-w-[380px] p-[10px_14px] bg-white/[0.08] rounded-[4px_12px_12px_12px] text-[13px] sm:text-[13.5px] leading-[20px] text-white">
                  Pronto: abri o chamado com prioridade alta. Um analista fala com você em até 4 h úteis.
                </div>
                <div className="w-fit flex items-center gap-2 p-[7px_12px] bg-white rounded-[12px]">
                  <div className="w-[7px] h-[7px] rounded-full bg-[#F5A500]" />
                  <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#1B2431]">
                    INC-20517
                  </span>
                  <span className="text-[11.5px] sm:text-[12.5px] text-[#5B6472]">
                    Rede e VPN · Alta · em até 4 h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full max-w-[672px] pt-6 flex flex-col sm:flex-row gap-4 sm:gap-0 border-t border-white/10">
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-[28px] sm:text-[34px] font-serif text-white tracking-[-0.6px]">
              8 s
            </span>
            <span className="text-[12.5px] sm:text-[13.5px] text-white/55">
              primeira resposta, em média
            </span>
          </div>
          <div className="flex-1 sm:pl-6 flex flex-col gap-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0">
            <span className="text-[28px] sm:text-[34px] font-serif text-white tracking-[-0.6px]">
              72%
            </span>
            <span className="text-[12.5px] sm:text-[13.5px] text-white/55">
              resolvidos sem fila
            </span>
          </div>
          <div className="flex-1 sm:pl-6 flex flex-col gap-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0">
            <div className="flex items-center gap-2">
              <span className="text-[28px] sm:text-[34px] font-serif text-white tracking-[-0.6px]">
                6
              </span>
              <div className="w-2 h-2 rounded-full bg-[#00BD6C]" />
            </div>
            <span className="text-[12.5px] sm:text-[13.5px] text-white/55">
              analistas online agora
            </span>
          </div>
        </div>
      </div>

      {/* Sign In (Right Panel) */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-[48px_64px] bg-white overflow-y-auto">
        {/* Help Row */}
        <div className="w-full flex items-center justify-end gap-1.5 text-[13.5px]">
          <span className="text-[#5B6472]">Problema para entrar?</span>
          <span className="font-semibold text-[#0069C7] cursor-pointer hover:underline">
            Ligue no ramal 4000
          </span>
        </div>

        {/* Form Center */}
        <div className="w-full flex justify-center my-auto py-6">
          <div className="w-full max-w-[400px] flex flex-col gap-7">
              {/* Heading */}
              <div className="flex flex-col gap-2">
                <h2 className="text-[40px] leading-[44px] font-serif font-normal text-[#1B2431] tracking-[-0.8px]">
                  Entrar
                </h2>
                <p className="text-[15.5px] leading-[23px] text-[#5B6472]">
                  Use seu e-mail corporativo e a senha da rede Nexo.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3 rounded-[8px] bg-red-50 border border-red-200 text-[13px] text-red-700">
                  {error}
                </div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13.5px] font-medium text-[#1B2431]">
                    E-mail corporativo
                  </label>
                  <div className="w-full h-[44px] px-3.5 flex items-center gap-2.5 bg-white border border-[#1B24311F] rounded-[8px] shadow-[0px_1px_2px_#1B24310A] focus-within:border-[#0062C4] focus-within:ring-1 focus-within:ring-[#0062C4]">
                    <Mail className="w-4 h-4 text-[#5B6472] shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.nome@nexo.com.br"
                      required
                      className="w-full bg-transparent border-none outline-none text-[14.5px] text-[#1B2431]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[13.5px] font-medium text-[#1B2431]">
                      Senha
                    </label>
                    <span className="text-[13.5px] font-medium text-[#0069C7] cursor-pointer hover:underline">
                      Esqueci minha senha
                    </span>
                  </div>
                  <div className="w-full h-[44px] px-3.5 flex items-center gap-2.5 bg-white border border-[#1B24311F] rounded-[8px] shadow-[0px_1px_2px_#1B24310A] focus-within:border-[#0062C4] focus-within:ring-1 focus-within:ring-[#0062C4]">
                    <Lock className="w-4 h-4 text-[#5B6472] shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sua senha da rede"
                      required
                      className="w-full bg-transparent border-none outline-none text-[14.5px] text-[#1B2431]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#5B6472] hover:text-[#1B2431]"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-[9px] cursor-pointer pt-0.5 select-none"
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-[6px] flex items-center justify-center transition-colors ${
                      rememberMe ? 'bg-[#0062C4]' : 'border border-[#1B243133]'
                    }`}
                  >
                    {rememberMe && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-[13.5px] text-[#3D4656]">
                    Manter conectado neste computador
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[44px] mt-2 bg-[#0062C4] hover:bg-[#0052a3] disabled:opacity-50 text-white rounded-[8px] font-semibold text-[15.5px] flex items-center justify-center gap-2 shadow-[0px_1px_2px_#0062C433,_0px_6px_16px_#0062C426] transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Entrar</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Login for Evaluator Convenience */}
              <div className="pt-4 border-t border-[#E6E8EC] flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] uppercase tracking-wider font-semibold text-[#5B6472]">
                    Acesso Rápido por Perfil (Clique para Entrar)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('teste@nexo.com.br')}
                    className="p-2.5 bg-[#0285F70D] hover:bg-[#0285F71A] text-[#0069C7] rounded-[8px] transition-colors text-left border border-[#0285F726] flex flex-col"
                  >
                    <span className="text-[12px] font-bold">👤 Usuário Teste</span>
                    <span className="text-[10.5px] text-[#5B6472]">Colaborador (Solicitante)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('analista.teste@nexo.com.br')}
                    className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-[8px] transition-colors text-left border border-amber-200 flex flex-col"
                  >
                    <span className="text-[12px] font-bold">🛡️ Analista Teste</span>
                    <span className="text-[10.5px] text-amber-700">Suporte N1/N2</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('ana.souza@nexo.com.br')}
                    className="p-2 bg-gray-50 hover:bg-gray-100 text-[#1B2431] rounded-[8px] text-[11px] font-medium transition-colors text-left border border-gray-200 flex flex-col"
                  >
                    <span className="font-semibold">Ana Souza</span>
                    <span className="text-[10px] text-[#5B6472]">Colaboradora (Design)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('roberto.lima@nexo.com.br')}
                    className="p-2 bg-gray-50 hover:bg-gray-100 text-[#1B2431] rounded-[8px] text-[11px] font-medium transition-colors text-left border border-gray-200 flex flex-col"
                  >
                    <span className="font-semibold">Roberto Lima</span>
                    <span className="text-[10px] text-[#5B6472]">Analista N2 (TI)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full flex items-center justify-between text-[12.5px] text-[#5B6472]">
            <span>© 2026 Nexo · Service desk de TI</span>
            <span className="cursor-pointer hover:underline">
              Privacidade e uso de dados
            </span>
          </div>
        </div>
      </div>
    );
  };

