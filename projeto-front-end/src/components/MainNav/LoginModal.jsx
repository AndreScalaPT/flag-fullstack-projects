import { Link } from "react-router-dom";
import logoWhite from "/imgs/contacto-logo-white.png";

/* Modal de login com opções de autenticação social (Google, Facebook, Apple) e email/password */

export default function LoginModal({ closeModal }) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      <div className="relative bg-neutral-900 text-white w-full max-w-md p-8 rounded-2xl shadow-2xl z-10000 animate-scaleIn">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <img src={logoWhite} alt="Logo" className="mx-auto mb-10 h-35" />

        <div className="space-y-3 mb-6">
          {/* GOOGLE */}
          <button
            className="
               group relative w-full h-12 rounded-full
               border border-[#7c7c7c] text-white font-bold
               flex items-center justify-center
               transition-all duration-150
               hover:scale-[1.04] hover:border-white
               "
          >
            <span className="absolute left-6 flex items-center justify-center">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.1 12.2272C22.1 11.5182 22.0364 10.8363 21.9182 10.1818H12.5V14.05H17.8818C17.65 15.3 16.9455 16.3591 15.8864 17.0682V19.5772H19.1182C21.0091 17.8363 22.1 15.2727 22.1 12.2272Z"
                  fill="#4285F4"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.4998 21.9999C15.1998 21.9999 17.4635 21.1045 19.118 19.5772L15.8862 17.0681C14.9907 17.6681 13.8453 18.0227 12.4998 18.0227C9.89529 18.0227 7.69075 16.2636 6.90439 13.8999H3.56348V16.4908C5.20893 19.759 8.59075 21.9999 12.4998 21.9999Z"
                  fill="#34A853"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.90455 13.9C6.70455 13.3 6.59091 12.6591 6.59091 12C6.59091 11.3409 6.70455 10.7 6.90455 10.1V7.50909H3.56364C2.88636 8.85909 2.5 10.3864 2.5 12C2.5 13.6136 2.88636 15.1409 3.56364 16.4909L6.90455 13.9Z"
                  fill="#FBBC05"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.4998 5.97727C13.968 5.97727 15.2862 6.48182 16.3226 7.47273L19.1907 4.60455C17.4589 2.99091 15.1953 2 12.4998 2C8.59075 2 5.20893 4.24091 3.56348 7.50909L6.90439 10.1C7.69075 7.73636 9.89529 5.97727 12.4998 5.97727Z"
                  fill="#EA4335"
                />
              </svg>
            </span>
            Continue with Google
          </button>

          {/* FACEBOOK */}
          <button
            className="
    group relative w-full h-12 rounded-full 
    border border-[#7c7c7c] text-white font-bold 
    flex items-center justify-center 
    transition-all duration-150 
    hover:scale-[1.04] hover:border-white
  "
          >
            <span className="absolute left-6 flex items-center justify-center">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12.5" cy="12" r="10" fill="white" />
                <path
                  d="M22.5 12C22.5 6.477 18.023 2 12.5 2C6.977 2 2.5 6.477 2.5 12C2.5 16.991 6.157 21.128 10.938 21.878V14.891H8.398V12H10.938V9.797C10.938 7.291 12.43 5.907 14.715 5.907C15.808 5.907 16.953 6.102 16.953 6.102V8.562H15.693C14.45 8.562 14.063 9.333 14.063 10.125V12H16.836L16.393 14.89H14.063V21.878C18.843 21.128 22.5 16.991 22.5 12Z"
                  fill="#1877F2"
                />
              </svg>
            </span>
            Continue with Facebook
          </button>

          {/* APPLE */}
          <button
            className="
               group relative w-full h-12 rounded-full 
               border border-[#7c7c7c] text-white font-bold 
               flex items-center justify-center 
               transition-all duration-150 
               hover:scale-[1.04] hover:border-white
               "
          >
            <span className="absolute left-6 flex items-center justify-center">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.544 12.695c-.03-3.009 2.463-4.461 2.573-4.525-1.403-2.051-3.588-2.334-4.358-2.366-1.846-.187-3.602 1.096-4.535 1.096-.948 0-2.39-1.073-3.937-1.04-2.02.03-3.897 1.187-4.939 3.013-2.108 3.654-.538 9.046 1.514 12.01 1.004 1.448 2.2 3.07 3.764 3.01 1.52-.062 2.088-.99 3.922-.99 1.82 0 2.345.99 3.938.961 1.63-.03 2.664-1.48 3.66-2.94 1.155-1.69 1.63-3.34 1.65-3.42-.036-.016-3.17-1.215-3.192-4.77z" />
                <path d="M14.85 3.73c.82-.99 1.38-2.37 1.23-3.73-1.19.05-2.62.79-3.46 1.77-.76.88-1.43 2.29-1.25 3.64 1.31.1 2.65-.66 3.48-1.68z" />
              </svg>
            </span>
            Continue with Apple
          </button>
        </div>

        <div className="flex items-center gap-4 my-8">
          <span className="flex-1 h-px bg-neutral-700"></span>
          <span className="text-neutral-400 text-sm">ou</span>
          <span className="flex-1 h-px bg-neutral-700"></span>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-white outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-white outline-none"
          />

          <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition">
            Entrar
          </button>
        </div>

        <p className="text-center text-neutral-400 mt-6">
          Não tem conta?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Criar nova conta
          </Link>
        </p>
      </div>
    </div>
  );
}
