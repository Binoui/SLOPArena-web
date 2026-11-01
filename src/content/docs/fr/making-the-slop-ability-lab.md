---
title: "Making the slop #1 : Ability Lab"
description: L’outil Unity où chaque coup de SLOPArena s’édite comme des données. On déplace le timing d’une hitbox, on la change d’os, on modifie ses dégâts, puis on la teste contre un adversaire avec la même simulation que le serveur.
section: build
order: 16
updated: 2026-11-01
---

<figure>
<video src="../../../devlog/making-the-slop/01-ability-lab/episode.mp4" poster="../../../devlog/making-the-slop/01-ability-lab/episode.webp" controls playsinline preload="metadata"></video>
<figcaption>L’épisode 1 en 45 secondes : timing, os, chiffres, et un vrai test contre un adversaire.</figcaption>
</figure>

*Making the slop* est une série sur les outils que j’ai construits pour faire SLOPArena. Une courte vidéo par outil, et une page comme celle-ci avec les détails.

Le premier, c’est Ability Lab. C’est la fenêtre Unity où je crée et règle chaque coup du jeu. Je l’ai commencée en août.

## Un coup, ce sont des données

Dans SLOPArena, un combattant est un package. Ses coups vivent dans un fichier, `character.json` : combien de ticks dure un coup (le jeu tourne à 60 ticks par seconde), quand sort chaque hitbox, à quel point elle frappe fort et quel os elle suit. Rien n’est codé en dur.

Ability Lab est une fenêtre sur ce fichier. On choisit un combattant et un coup, et on a le modèle en aperçu, la timeline du coup en dessous, et tous les champs de l’effet sélectionné à droite.

<figure><img src="../../../devlog/making-the-slop/01-ability-lab/lab.webp" alt="La fenêtre Ability Lab : le Straight Punch de FightGuy dans l’aperçu avec sa sphère de hitbox, la timeline en dessous, et les champs de la hitbox à droite" loading="lazy"><figcaption>Le Straight Punch de FightGuy. L’aperçu, la timeline en dessous, et les champs de la hitbox à droite.</figcaption></figure>

## Le timing

Chaque effet est une barre sur la timeline. On fait glisser la barre de la hitbox et elle sort plus tard. On tire sur sa fin et elle reste active plus longtemps. On avance le coup image par image et la hitbox apparaît exactement sur les ticks qu’on lui a donnés.

<figure><img src="../../../devlog/making-the-slop/01-ability-lab/timing.webp" alt="La timeline du Lab avec la barre jaune de la hitbox sélectionnée sous le coup de poing de FightGuy" loading="lazy"><figcaption>La barre jaune, c’est la hitbox du coup de poing, active du tick 7 au tick 14.</figcaption></figure>

## Les os

Une hitbox suit un os de l’animation. Dans la vidéo, la hitbox du coup de poing passe de la main droite aux orteils avec un seul menu déroulant, et elle suit ensuite le pied pendant toute l’animation. Une hitbox peut aussi être une capsule entre deux os, pour un membre entier ou tout le corps, comme ici des orteils à la tête.

Le Lab dessine aussi, en orange plus sombre, la bande qu’une hitbox d’os a balayée depuis le tick précédent. Un coup rapide peut parcourir une grande distance en un tick, et la bande montre ce qu’il a vraiment couvert.

<div class="duo">
<figure><img src="../../../devlog/making-the-slop/01-ability-lab/bone-list.webp" alt="Le menu de l’os de départ ouvert, avec la liste des os du squelette" loading="lazy"><figcaption>N’importe quel os du squelette.</figcaption></figure>
<figure><img src="../../../devlog/making-the-slop/01-ability-lab/capsule.webp" alt="Une hitbox en capsule étirée des orteils à la tête de FightGuy" loading="lazy"><figcaption>Ou une capsule entre deux os.</figcaption></figure>
</div>

## Les chiffres

Chaque hitbox a les champs qu’on attend d’un jeu de combat de plateforme : dégâts, angle d’éjection, knockback de base, croissance du knockback, hitstun, forme, rayon et décalages. On en change un et l’aperçu se met à jour tout de suite. Les modifications restent dans un brouillon en mémoire, et rien n’est écrit sur le disque avant que j’appuie sur Save + Cook.

## Le même code que le serveur

C’est la partie qui compte le plus pour moi. Le gameplay de SLOPArena est une seule simulation en C#, et le jeu, les serveurs et le Lab la font tous tourner. Les hitbox et hurtbox que dessine le Lab sont celles que la simulation a testées sur ce tick, pas un dessin de ce que je crois que le coup fait.

Le Lab peut aussi jouer un coup contre un adversaire. On règle la distance, l’orientation, les dégâts de l’adversaire, et s’il reste immobile ou tient son bouclier, et la simulation joue la scène. Le Lab ne truque pas le résultat. Il montre ce qui s’est passé : un coup, un blocage, un raté.

<div class="duo">
<figure><img src="../../../devlog/making-the-slop/01-ability-lab/hit-1m.webp" alt="Le coup de poing de FightGuy touche un adversaire à 1 mètre, qui est éjecté" loading="lazy"><figcaption>À 1 mètre : touché à l’image 5, 7 %.</figcaption></figure>
<figure><img src="../../../devlog/making-the-slop/01-ability-lab/miss-2m.webp" alt="Le même coup de poing avec l’adversaire à 2 mètres, aucun contact" loading="lazy"><figcaption>À 2 mètres : aucun contact.</figcaption></figure>
</div>

Quand un coup a l’air bon dans le Lab, j’appuie sur Save + Cook. Le package est compilé en un fichier cuit et hashé, et le jeu comme les serveurs chargent exactement ce fichier. Le dernier plan de la vidéo, c’est le jeu lui-même.

## Les agents s’en servent aussi

Une grande partie de SLOPArena est construite avec des agents IA, et eux aussi doivent tester des coups. Le Lab a des commandes qu’un agent peut appeler sans rien cliquer : ouvrir un combattant, jouer un coup contre un adversaire, aller à une image, prendre une capture. Ils récupèrent la scène image par image : positions, dégâts, hitstun, et chaque coup ou blocage qui a eu lieu. L’agent voit le même résultat que moi dans la fenêtre.

## Ce que je conseillerais à un autre dev

Si vous faites un jeu de combat, faites tourner votre vrai code de jeu dans votre éditeur de coups, pas une copie. Une copie s’éloigne du jeu, et on finit par régler des coups que personne ne jouera jamais. Avec le Lab, ce que je règle, c’est ce que les joueurs ont.

Pour aller plus loin, lisez comment le jeu est assemblé dans [Comment SLOPArena est fabriqué](../how-its-made/), ou voyez le Lab sur un combattant entier dans [Nyx en une journée](../making-nyx/).
