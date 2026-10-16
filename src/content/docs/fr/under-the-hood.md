---
title: Sous le capot
description: Comment tourne un match de SLOPArena. Une simulation déterministe, un serveur qui fait autorité, prédiction et rollback, et des salons plutôt que des files d’attente.
section: build
order: 20
updated: 2026-10-16
---

SLOPArena a l’air d’un party game et se construit comme un jeu de combat. Voici ce qui se passe quand vous appuyez sur un bouton.

## Une seule simulation, partout

Toutes les règles du jeu vivent dans une bibliothèque C# pure, **Shared**, qui tourne à **60 Hz**. Elle ne sait rien d’Unity : pas de moteur physique, pas de callbacks d’animation. Le client, le GameServer, Training et les outils de dev exécutent le même code, donc un coup se comporte pareil partout.

Les hitbox et hurtbox viennent de poses d’animation précalculées, pas de la physique d’Unity. Le serveur n’affiche jamais une image, et pourtant il sait où se trouve chaque poing et chaque épée à chaque tick.

## Le serveur est l’arbitre

En ligne, le **GameServer** fait autorité. Il fait tourner la vraie simulation, décide des coups, des dégâts et des éjections, puis envoie le résultat à tout le monde. Votre jeu affiche cet état et ajoute le spectacle : animations, effets et son.

## Prédiction et rollback

Attendre le serveur avant de bouger serait insupportable, alors le jeu **prédit**. Vos propres commandes s’appliquent immédiatement. Quand l’état du serveur arrive, le jeu **se réconcilie** : s’il s’est trompé, il revient en arrière et rejoue. Les adversaires sont prédits quand c’est sans risque, et corrigés sinon.

C’est la partie en cours de réparation. Si des combattants sautent, se figent ou se désynchronisent, [signalez-le](../../feedback/).

## Des salons, pas de file d’attente

Pas de matchmaking automatique. Un **serveur Master** gère la liste des serveurs, les salons et le chat, et connecte les joueurs via Steam. Un salon accueille jusqu’à quatre joueurs et survit à la sélection des personnages, au match, à l’écran des résultats et à la revanche. Au lancement d’un match, Master le confie à un GameHost.

## Du contenu fiable

Les combattants sont livrés sous forme de **packages cuits** : des artefacts immuables avec un manifeste et des hashes. Chaque match fige les versions exactes des packages, donc le jeu et le serveur ne peuvent pas être en désaccord sur ce que fait un coup.

C’est aussi la base pour de futurs combattants créés par la communauté : les créateurs assembleraient des briques déterministes approuvées plutôt que d’envoyer du code arbitraire.

## Pour aller plus loin (en anglais)

- [Vue d’ensemble de l’architecture ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/architecture-overview.md)
- [Architecture du netcode ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/systems/netcode-architecture.md)
- [Systèmes de combat ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/systems/combat-systems.md)
- [Ability Lab ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/systems/ability-lab.md)
