# --- RPG Textual: A Jornada do Desenvolvedor ---
# Autor: Hubert
# Descrição: Jogo clássico em modo texto que simula uma jornada de TI,
# com escolhas de caminhos, testes lógicos e alocação de atributos.

import random
import time

def mostrar_introducao():
    print("==============================================")
    print("⚔️  BEM-VINDO À JORNADA DO DESENVOLVEDOR RPG!  ⚔️")
    print("==============================================")
    print("Você inicia sua carreira como um Programador Júnior.")
    print("Seu objetivo é sobreviver aos bugs, vencer reuniões de sprint")
    print("e se consolidar como Engenheiro de Software Diretor.")
    print("==============================================")

def aventura():
    status = {
        "saude_mental": 100,
        "conhecimento": 15,
        "cafe": 3,
        "projetos_concluidos": 0
    }
    
    mostrar_introducao()
    
    # Rodada 1: O Bug da Sexta-Feira às 17:50
    print("\n🚨 EVENTO LIMITADO: O temível erro 500 no ambiente de Produção!")
    print("Seu chefe pergunta quem quer fazer o Hotfix de emergência. O que você faz?")
    print("1. Assume a bronca sozinho (Custo de Saúde Mental alto, ganho de Conhecimento altíssimo).")
    print("2. Finge que a internet caiu e vai embora (Preserva Saúde Mental, mas perde credibilidade).")
    print("3. Pede ajuda para o Pleno (Equilibrado).")
    
    opcao = input("Escolha sua ação (1/2/3): ").strip()
    if opcao == "1":
        status["saude_mental"] -= 30
        status["conhecimento"] += 50
        status["projetos_concluidos"] += 1
        print("💡 Fantástico! Você virou a noite e resolveu o problema. Seu cérebro está fritando, mas você dominou o stacktrace.")
    elif opcao == "2":
        status["saude_mental"] += 10
        status["conhecimento"] -= 5
        print("🤫 Você escapou do caos. Assistiu série no final de semana, mas na segunda a cobrança será pesada.")
    else:
        status["saude_mental"] -= 10
        status["conhecimento"] += 20
        status["projetos_concluidos"] += 1
        print("🤝 Ótima escolha colaborativa. Junto com o Pleno, você corrigiu o código e aprendeu novos padrões de design.")

    print(f"\n📊 Atributos Atuais: Saúde Mental: {status['saude_mental']}% | Conhecimento: {status['conhecimento']} XP")

adventure_running = True
if __name__ == "__main__":
    aventura()
