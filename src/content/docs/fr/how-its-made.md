---
title: Comment SLOPArena est fabriqué
description: Un développeur, une simulation déterministe, une pile d’agents IA et une boucle de playtest. Le workflow derrière le jeu.
section: build
order: 10
updated: 2026-10-16
---

SLOPArena est fait par un seul développeur, en public, avec beaucoup d’aide d’agents de code IA. C’est de là que vient le nom. Cette page parcourt la boucle qui transforme une idée en build de playtest, et montre où atterrissent vos retours.

## La boucle

1. **Concevoir un kit.** Chaque combattant commence par une courte doc de design : qui il est, comment il gagne, ce qu’il fait mal. Tous les kits tiennent dans la même grille de six coups normaux (trois touches, au sol et en l’air) et quatre spéciales. Voir les [principes de design des kits ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/characters/character-kit-design-principles.md) (en anglais).
2. **Écrire un package de personnage.** Un combattant est un package : `character.json` contient le gameplay, un catalogue d’assets relie le modèle et les animations. Ces fichiers servent à l’édition, jamais à ce que le jeu exécute réellement.
3. **Régler dans Ability Lab.** Un outil Unity fait défiler un coup image par image et affiche les vraies hitbox et hurtbox, calculées par le même code que le serveur. Ce que vous voyez dans le Lab, c’est ce que le serveur calculera.
4. **Le « cuire ».** Un compilateur transforme le package en artefact immuable et hashé. Chaque match fige les versions et les hashes exacts : le jeu et le serveur sont toujours d’accord sur ce que fait un coup.
5. **Le tester.** Des vérifications automatiques tournent sur la simulation : tests unitaires, scénarios de référence par kit, rapports de données de coups. Ensuite, un humain joue, parce qu’aucun test ne dit si un coup est agréable.
6. **Publier un build de playtest.** Le client Windows est compilé de façon isolée puis envoyé sur le playtest Steam, et les serveurs correspondants sont déployés en même temps.
7. **Lire les rapports.** Ce qui arrive par le [formulaire d’avis](../../feedback/), Discord et GitHub décide de ce qui sera corrigé et réglé ensuite. Puis la boucle recommence.

## La place de l’IA

Des agents IA écrivent une bonne partie du code et des docs de SLOPArena, et des images générées font partie du pipeline d’assets. Ils travaillent à partir d’instructions publiques et de workflows rangés dans le dépôt : n’importe quel assistant (Codex, Claude Code, OMP, ou tout ce qui sait lire des fichiers) suit les mêmes règles.

- **Les mêmes instructions pour tous.** `AGENTS.md` fixe les règles. `skills/` contient des workflows pas à pas pour créer un personnage, animer, concevoir une arène, utiliser Ability Lab ou publier une version.
- **Un humain décide.** Les agents proposent et implémentent. Le développeur relit, teste en jeu et valide. Des tests au vert ne veulent jamais dire « c’est agréable à jouer ».
- **Pas de faux succès.** Quand un workflow a besoin d’un outil indisponible, il s’arrête avec des étapes concrètes au lieu de faire semblant d’avoir réussi.
- **L’IA est une méthode, pas un style.** Les modèles générés sont nettoyés dans Blender, reciblés et vérifiés sur le vrai personnage. Le rendu lisse façon diffusion compte comme un bug.

## Animation : des poses aux coups

Les nouveaux coups suivent un pipeline documenté : écrire un brief, poser les poses clés sur le vrai squelette, laisser [GenRA ↗](https://github.com/MacPaw/GenRA) les traiter et les interpoler, prévisualiser sur le vrai personnage, et ne relier le coup au package qu’une fois approuvé. D’ici là, les candidats restent non reliés. La procédure complète est dans le [workflow d’animation GenRA ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/characters/genra-animation-workflow.md) (en anglais).

## La boîte à outils

| Outil | Son rôle |
| --- | --- |
| Unity 6 | Le client du jeu, Ability Lab et les outils d’édition |
| Simulation C# partagée | Les règles du jeu à 60 Hz, utilisées par le jeu et par les serveurs |
| GameServer et Master | Matchs de référence, salons, chat et liste des serveurs |
| Blender | Nettoyage des modèles, corrections de squelettes et décors procéduraux |
| GitHub Actions | Vérifications, builds de version et déploiements |

Envie du côté technique ? Lisez [Sous le capot](../under-the-hood/), ou plongez dans les [docs du jeu sur GitHub ↗](https://github.com/Binoui/SLOPArena/tree/main/docs).
