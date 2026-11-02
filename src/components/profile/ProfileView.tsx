import React, { useState } from 'react';
import { ChevronRight, Lock, KeyRound, RotateCcw, Mail, CheckCircle2, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProfileViewProps {
  onOpenMobileMenu?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenMobileMenu }) => {
  const { user } = useAuth();
  const [resetSent, setResetSent] = useState(false);

  if (!user) return null;

  const handleResetPassword = () => {
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
    }, 5000);
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-white overflow-hidden">
      {/* Top Bar matching Pencil prototype */}
      <header className="w-full h-[64px] shrink-0 border-b border-[#E6E8EC] px-4 sm:px-8 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-1.5 -ml-1.5 mr-1 rounded-[8px] hover:bg-gray-100 text-[#1B2431] transition-colors"
              title="Abrir menu"
            >
              <Menu className="w-5 h-5 text-[#1B2431]" />
            </button>
          )}
          <span className="text-[13.5px] text-[#5B6472] font-normal hidden sm:inline">
            Service desk de TI
          </span>
          <ChevronRight className="w-[14px] h-[14px] text-[#5B6472] hidden sm:inline" />
          <span className="text-[13.5px] font-semibold text-[#1B2431]">
            Meu perfil
          </span>
        </div>
      </header>

      {/* Page Content */}
      <div className="w-full flex-1 overflow-y-auto flex flex-col items-center p-4 sm:p-8 md:p-[48px_40px]">
        <div className="w-full max-w-[600px] flex flex-col gap-[24px] sm:gap-[32px] items-start">
          {/* Heading */}
          <div className="w-full flex flex-col gap-[6px]">
            <h1 className="text-[20px] sm:text-[24px] text-[#1B2431] font-bold tracking-[-0.4px] font-['Schibsted_Grotesk',system-ui,sans-serif]">
              Meu perfil
            </h1>
            <p className="text-[13.5px] sm:text-[14.5px] text-[#5B6472] font-normal font-['Schibsted_Grotesk',system-ui,sans-serif]">
              Seus dados de acesso ao service desk de TI.
            </p>
          </div>

          {/* Dados Card */}
          <div className="w-full shadow-[0px_1px_2px_#1B24310D,_0px_6px_18px_#1B24310A] flex flex-col bg-white outline outline-1 outline-[#1B243117] -outline-offset-[0.5px] rounded-[16px] overflow-hidden">
            {/* Nome */}
            <div className="w-full min-h-[58px] flex flex-col sm:flex-row gap-1 sm:gap-[16px] px-4 sm:px-[24px] py-3.5 sm:py-[20px] items-start sm:items-center border-b border-[#E6E8EC]">
              <div className="text-[13px] sm:text-[13.5px] w-full sm:w-[160px] shrink-0 text-[#5B6472] font-normal">
                Nome
              </div>
              <div className="flex-1 flex flex-row gap-[12px] items-center">
                <span className="text-[14px] sm:text-[14.5px] text-[#1B2431] font-medium">
                  {user.name}
                </span>
              </div>
            </div>

            {/* E-mail corporativo */}
            <div className="w-full min-h-[58px] flex flex-col sm:flex-row gap-1 sm:gap-[16px] px-4 sm:px-[24px] py-3.5 sm:py-[20px] items-start sm:items-center">
              <div className="text-[13px] sm:text-[13.5px] w-full sm:w-[160px] shrink-0 text-[#5B6472] font-normal">
                E-mail corporativo
              </div>
              <div className="flex-1 flex flex-col gap-[2px]">
                <span className="text-[14px] sm:text-[14.5px] text-[#1B2431] font-medium break-all">
                  {user.email}
                </span>
              </div>
              <div className="w-fit shrink-0 flex flex-row gap-[5px] items-center mt-1 sm:mt-0">
                <Lock className="w-[13px] h-[13px] text-[#5B6472]" />
                <span className="text-[12px] sm:text-[12.5px] text-[#5B6472] font-normal whitespace-nowrap">
                  Gerenciado pela TI
                </span>
              </div>
            </div>
          </div>

          {/* Senha Card */}
          <div className="w-full shadow-[0px_1px_2px_#1B24310D,_0px_6px_18px_#1B24310A] flex flex-col bg-white outline outline-1 outline-[#1B243117] -outline-offset-[0.5px] rounded-[16px] overflow-hidden">
            <div className="w-full flex flex-col sm:flex-row gap-4 p-4 sm:p-[24px] items-start sm:items-center">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-[40px] shrink-0 h-[40px] flex justify-center items-center bg-[#F6F7F9] rounded-full">
                  <KeyRound className="w-[18px] h-[18px] text-[#3D4656]" />
                </div>
                <div className="flex-1 flex flex-col gap-[3px]">
                  <span className="text-[14.5px] text-[#1B2431] font-semibold">
                    Senha
                  </span>
                  <span className="text-[13px] sm:text-[13.5px] text-[#5B6472] font-normal">
                    Alterada há 42 dias
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetPassword}
                className="w-full sm:w-fit shrink-0 h-[36px] drop-shadow-[0px_1px_1px_#1B24310D] flex flex-row justify-center gap-[7px] px-[14px] items-center outline outline-1 outline-[#1B24311F] -outline-offset-[0.5px] rounded-[8px] hover:bg-gray-50 text-[13.5px] font-medium text-[#3D4656] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-[15px] h-[15px] text-[#5B6472]" />
                <span>Redefinir senha</span>
              </button>
            </div>

            {/* Helper Bar */}
            <div className="w-full min-h-[40px] shrink-0 flex flex-row gap-[8px] px-4 sm:px-[24px] py-[10px] items-center bg-[#F6F7F9] border-t border-[#E6E8EC]">
              {resetSent ? (
                <>
                  <CheckCircle2 className="w-[14px] h-[14px] text-[#00804A] shrink-0" />
                  <span className="text-[12.5px] sm:text-[13px] text-[#00804A] font-medium">
                    Link de redefinição enviado com sucesso para {user.email}!
                  </span>
                </>
              ) : (
                <>
                  <Mail className="w-[14px] h-[14px] text-[#5B6472] shrink-0" />
                  <span className="text-[12.5px] sm:text-[13px] text-[#5B6472] font-normal">
                    Enviaremos um link de redefinição para {user.email}.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

