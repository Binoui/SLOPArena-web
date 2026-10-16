---
title: Contribuer
description: SLOPArena est sous licence MIT. Signalez des bugs, débattez de l’équilibrage, corrigez le site ou proposez une pull request sur le jeu.
section: build
order: 30
updated: 2026-10-16
---

SLOPArena est open source, sous licence MIT. Le code, l’art, les docs, les retours de design et les playtests comptent tous.

## Les façons simples

- **Jouer et signaler.** Le [formulaire d’avis](../../feedback/) arrive directement chez le développeur. Les bugs reproductibles font d’excellentes [issues GitHub ↗](https://github.com/Binoui/SLOPArena/issues).
- **Débattre de l’équilibrage.** C’est à ça que sert le [Discord ↗](https://discord.gg/VvfaxDCF6Z).
- **Corriger le site.** Ce site a son propre petit [dépôt ↗](https://github.com/Binoui/SLOPArena-web), et chaque page de docs renvoie vers sa source en bas de page.

## Travailler sur le jeu

Clonez [le dépôt du jeu ↗](https://github.com/Binoui/SLOPArena). La simulation, le serveur et les outils demandent le SDK .NET 8 et se compilent et se testent sans Unity :

```bash
dotnet build SlopArena.sln --nologo -p:SkipUnityPluginCopy=true
dotnet test SlopArena.sln --no-build --nologo -p:SkipUnityPluginCopy=true
```

Le client Unity complet demande Unity 6000.0.78f1, le package Animancer installé séparément et des assets artistiques locaux : un clone tout neuf ne peut pas encore lancer le jeu complet. Le [guide de contribution ↗](https://github.com/Binoui/SLOPArena/blob/main/CONTRIBUTING.md) (en anglais) explique l’installation.

## Travailler avec des assistants IA

Allez-y. Indiquez `AGENTS.md` à votre assistant ; les workflows du projet sont dans `skills/`. Chaque patch passe la même relecture, quelle que soit la façon dont il a été produit : déterminisme, licences, justesse du gameplay et maintenabilité d’abord.

## Créer un combattant

Les nouveaux combattants sont natifs en packages. Commencez par [Adding a character ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/characters/adding-a-new-character.md). Les workflows **SlopBot** peuvent guider un assistant pas à pas dans la création d’un personnage humanoïde.

## Règles de la maison

Restez correct : le projet suit un [code de conduite ↗](https://github.com/Binoui/SLOPArena/blob/main/CODE_OF_CONDUCT.md). Gardez vos pull requests petites et ciblées.
