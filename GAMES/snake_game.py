# --- Snake Game Clássico com Pygame ---
# Autor: Hubert
# Descrição: Jogo clássico Snake (cobrinha) em Pygame com controle de teclado e contador de placar.

import pygame
import random
import sys

pygame.init()
LARGURA, ALTURA = 640, 480
tela = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("🐍 Retro Snake de Hubert")

PRETO = (10, 5, 36)
VERDE = (0, 255, 204)
VERMELHO = (255, 60, 60)
BRANCO = (255, 255, 255)

TAM_BLOCO = 20
VELOCIDADE = 10
relogio = pygame.time.Clock()

def jogar():
    x, y = LARGURA / 2, ALTURA / 2
    delta_x, delta_y = 0, 0
    corpo_cobra = []
    tamanho_cobra = 1
    
    comida_x = round(random.randrange(0, LARGURA - TAM_BLOCO) / 20.0) * 20.0
    comida_y = round(random.randrange(0, ALTURA - TAM_BLOCO) / 20.0) * 20.0
    placar = 0
    
    while True:
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                return
            if evento.type == pygame.KEYDOWN:
                if evento.key == pygame.K_LEFT and delta_x == 0:
                    delta_x = -TAM_BLOCO
                    delta_y = 0
                elif evento.key == pygame.K_RIGHT and delta_x == 0:
                    delta_x = TAM_BLOCO
                    delta_y = 0
                elif evento.key == pygame.K_UP and delta_y == 0:
                    delta_y = -TAM_BLOCO
                    delta_x = 0
                elif evento.key == pygame.K_DOWN and delta_y == 0:
                    delta_y = TAM_BLOCO
                    delta_x = 0

        x += delta_x
        y += delta_y
        
        # Colisões
        if x >= LARGURA or x < 0 or y >= ALTURA or y < 0:
            return # Fim de jogo
            
        tela.fill(PRETO)
        pygame.draw.rect(tela, VERMELHO, [comida_x, comida_y, TAM_BLOCO, TAM_BLOCO])
        
        cabeca = [x, y]
        corpo_cobra.append(cabeca)
        if len(corpo_cobra) > tamanho_cobra:
            del corpo_cobra[0]
            
        for bloco in corpo_cobra[:-1]:
            if bloco == cabeca:
                return # Colisão própria
                
        for bloco in corpo_cobra:
            pygame.draw.rect(tela, VERDE, [bloco[0], bloco[1], TAM_BLOCO, TAM_BLOCO])
            
        if x == comida_x and y == comida_y:
            comida_x = round(random.randrange(0, LARGURA - TAM_BLOCO) / 20.0) * 20.0
            comida_y = round(random.randrange(0, ALTURA - TAM_BLOCO) / 20.0) * 20.0
            tamanho_cobra += 1
            placar += 10
            
        pygame.display.update()
        relogio.tick(VELOCIDADE)

if __name__ == "__main__":
    print("Iniciando Snake Game...")
    # jogar()
