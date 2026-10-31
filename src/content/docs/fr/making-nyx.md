---
title: Nyx en une journée
description: Une soirée de concept art, une journée d’agents. Comment Nyx est passée d’une idée de fille goth à une combattante jouable à deux formes, avec chaque prompt et chaque raté sur une seule frise, et les outils qui permettent à des dizaines d’agents de partager un seul éditeur Unity.
section: build
order: 15
updated: 2026-10-29
---

<figure>
<video src="../../../devlog/nyx/tools-video.mp4" poster="../../../devlog/nyx/tools-video.webp" controls playsinline preload="metadata"></video>
<figcaption>Toute la fabrication en une minute : concepts, modèles, rigs, animations, les outils, les ratés, et Nyx en jeu.</figcaption>
</figure>

Nyx est la nouvelle combattante de SLOPArena. Elle alterne entre deux formes, un peu comme Zelda et Sheik dans Melee. Sa vraie forme est une vraie goth qui se bat en sorcière des ombres. Sa fausse forme est une influenceuse goth qui se bagarre avec son téléphone et le ring light accroché à son sac à dos.

Le 28 octobre à 19 h 41, ce n’était qu’une idée d’une ligne dans un chat. 22 heures plus tard, dont 9 à dormir, elle était jouable sous ses deux formes, avec 24 animations à elle, ses effets, et une modification du moteur pour qu’un combattant puisse avoir des formes. Cette page raconte comment, ratés compris.

<div class="duo">
<figure><img src="../../../devlog/nyx/portrait-real.webp" alt="Portrait de la vraie forme de Nyx, une sorcière goth aux griffes d’ombre" loading="lazy"><figcaption>Nyx, la vraie goth.</figcaption></figure>
<figure><img src="../../../devlog/nyx/portrait-fake.webp" alt="Nyxxie, la fausse forme, téléphone en main et signe de paix" loading="lazy"><figcaption>Nyxxie, l’influenceuse.</figcaption></figure>
</div>

<div class="stats">
<div><b>21</b>prompts de ma part</div>
<div><b>30</b>tâches d’agents</div>
<div><b>12 h 47</b>de travail d’agents</div>
<div><b>24</b>animations</div>
<div><b>43 $</b>pour les 24 animations</div>
</div>

<div class="credits">
<div><b>Claude Opus</b>a mené le projet et écrit les animations via GenRA</div>
<div><b>Codex</b>a dessiné les concepts, écrit l’essentiel du code et les effets</div>
<div><b>GenRA</b>de MacPaw, la recherche dont notre outil d’animation est un fork</div>
<div><b>Tripo</b>a fait les modèles</div>
<div><b>Mixamo</b>les a riggés</div>
<p>Le tout dans une seule fenêtre <a href="#t3-code--une-fenêtre-pour-tous-les-agents">T3 Code</a>.</p>
</div>

## Comment je travaille avec les agents

Je parle à un seul fil coordinateur (Claude). Il construit peu lui-même. Il écrit des briefs, les confie à d’autres fils d’agents (OpenAI Codex ou Claude, choisis selon la tâche), puis vérifie ce qui revient avant de me le montrer. Sur Nyx, il a lancé 30 tâches et n’a lui-même travaillé qu’environ deux heures sur les 22. Moi, je donne la direction, je dis oui ou non, et je joue le résultat. Les outils qui rendent ça possible sont [en bas de la page](#les-outils-derrière).

## La soirée : trouver son look

La plupart de mes prompts sont passés ici. Codex générait trois ou quatre concepts par tour, avec le vrai roster en référence, et je choisissais ou je rejetais.

<div class="duo">
<figure><img src="../../../devlog/nyx/r1-literal.webp" alt="Concept du tour 1 : une goth littérale à côté d’une e-girl rose" loading="lazy"><figcaption>Tour 1. Pas mal, mais rien ne ressemblait à SLOPArena.</figcaption></figure>
<figure><img src="../../../devlog/nyx/r2-gremlin.webp" alt="Concept du tour 2 : une goth trapue aux cheveux énormes" loading="lazy"><figcaption>Tour 2. Meilleurs vêtements, toujours pas le style du roster.</figcaption></figure>
</div>

La vraie forme a été validée au tour 4 : posture droite, cheveux raides, visage blanc, plus de bijoux. La fausse forme a pris trois tours de plus. Le tour 5 est revenu avec des goths de magasin de déguisements, complètement hors sujet (« Those are not fake goth girl concepts? I'm confused why you did those »). La référence que j’avais en tête, c’était l’e-girl goth OnlyFans, et toute la difficulté était de la rendre lisible en parodie sans la sexualiser. La version parodique du tour 7 a gagné, avec un téléphone en moins.

<div class="trio">
<figure><img src="../../../devlog/nyx/r4-curtain.webp" alt="Tour 4 : la vraie forme validée" loading="lazy"><figcaption>Tour 4. Vraie forme validée.</figcaption></figure>
<figure><img src="../../../devlog/nyx/r5-costume.webp" alt="Tour 5 : une goth de magasin de déguisements, hors sujet" loading="lazy"><figcaption>Tour 5. Hors sujet.</figcaption></figure>
<figure><img src="../../../devlog/nyx/r7-parody.webp" alt="Tour 7 : l’influenceuse parodique validée" loading="lazy"><figcaption>Tour 7. Fausse forme validée.</figcaption></figure>
</div>

Ensuite, une planche par forme, face, dos et visage, validée telle quelle.

<div class="duo">
<figure><img src="../../../devlog/nyx/sheet-real.webp" alt="Planche validée de la vraie forme" loading="lazy"></figure>
<figure><img src="../../../devlog/nyx/sheet-fake.webp" alt="Planche validée de la fausse forme" loading="lazy"></figure>
</div>

## Le kit

J’ai demandé que chaque forme tienne debout seule, et que le changement de forme soit l’outil de combo fun. La vraie forme est une zoneuse calme dont les ombres frappent à sa place : Hex Crow (un corbeau lent et autoguidé qui se perche sur vous), Bat Scatter (elle se change en chauves-souris pour revenir) et Grasp (une main d’ombre vous traîne vers elle). La fausse forme est une bagarreuse rapide : un flash de Ring Light, le ring light qui tourne comme un rotor pour revenir, et Selfie Grab. Changer de forme sur F frappe aussi. Going Live attire l’adversaire, Logging Off le repousse. Le coordinateur a peint chaque spécial en concept avant que quoi que ce soit soit construit.

<figure><img src="../../../devlog/nyx/moves-board.webp" alt="Neuf concepts des spéciaux et changements de forme de Nyx" loading="lazy"><figcaption>Concepts des coups, avant tout travail sur le moteur.</figcaption></figure>

## La nuit : les modèles

À partir des planches validées, les agents ont préparé des vues propres de face, de dos et de profil. Je les ai passées dans Tripo pour obtenir un modèle 3D par forme. Avant que j’aille me coucher, le coordinateur a lancé quatre tâches : 24 planches de poses, la préparation des modèles pour Mixamo, et la conception moteur des formes. Le matin, j’ai répondu à ses six questions de conception, en même temps que j’envoyais les deux rigs Mixamo.

<figure><img src="../../../devlog/nyx/pose-sheets.webp" alt="Planches de poses des spéciaux de la fausse forme" loading="lazy"><figcaption>Les poses des spéciaux de la fausse forme, une planche sur 24.</figcaption></figure>

## Le jour du build

De 10 h 49 à environ 16 h 15, 15 tâches ont tourné, jusqu’à trois en même temps.

- **Un corps, deux meshs.** Les deux formes partagent un squelette, et changer de forme change simplement le mesh affiché. Le premier package utilisait les animations de FightGuy en attendant, donc tout le kit était jouable en Training dès midi.
- **Le moteur, en quatre phases.** Les formes et le changement de forme, puis ses normaux et les spéciaux simples, puis Grasp, Hex Crow et Selfie Grab, puis le CPU, le HUD et Ability Lab. Après les phases, le coordinateur relançait les tests et vérifiait que les données des autres combattants n’avaient pas bougé.
- **Ses propres animations.** 24 coups via [GenRA](#genra--une-ia-qui-anime-avec-du-code), un seul tour, 43 $ au total. 20 ont passé les vérifications automatiques. J’ai validé les 24 après un seul visionnage.
- **Les effets.** Peints en concepts sur ses propres frames d’animation, validés, puis construits.

<figure>
<video src="../../../devlog/nyx/animation-takes.mp4" poster="../../../devlog/nyx/animation-takes.webp" autoplay muted loop playsinline></video>
<figcaption>Prises d’animation non liées, sous trois angles. Ring Light Uppercut, Logging Off, Grasp.</figcaption>
</figure>

<figure><img src="../../../devlog/nyx/genra-board.webp" alt="Tableau de revue des animations, avec poses clés et résultats des vérifications" loading="lazy"><figcaption>Le tableau de revue. Chaque coup a sa planche de poses, ses poses clés et ses résultats de vérification.</figcaption></figure>

## Ce qui a raté

Cinq des 19 tâches de build étaient des reprises, et deux de mes sept prompts après le design étaient des rapports de bug.

**La robe.** Unity Cloth a échoué deux fois sur la longue robe de la vraie forme. Le premier essai lui écartait les jambes dessous. Le second tombait comme un abat-jour et s’effondrait entre ses jambes quand elle courait. Le troisième a gardé la forme de robe validée et l’a accrochée à 12 chaînes d’os à ressort, sans aucune simulation de tissu.

<div class="duo">
<figure><video src="../../../devlog/nyx/dress-v2-fail.mp4" poster="../../../devlog/nyx/dress-v2-fail.webp" autoplay muted loop playsinline></video><figcaption>Cloth, essai 2. Non.</figcaption></figure>
<figure><video src="../../../devlog/nyx/dress-final.mp4" poster="../../../devlog/nyx/dress-final.webp" autoplay muted loop playsinline></video><figcaption>Chaînes à ressort. Oui.</figcaption></figure>
</div>

**La colonne cassée.** Un peu plus tard, j’ai demandé « it looks like she has a broken spine? ». En posant la vraie forme sur le squelette partagé, son torse était resté exactement comme modélisé, mais la colonne du squelette passait 2 à 6 cm devant. Un réajustement sur le squelette a réglé le problème.

<figure><img src="../../../devlog/nyx/spine-fix.webp" alt="Vue de profil du modèle validé, du mauvais ajustement et de la correction" loading="lazy"><figcaption>Vue de profil. À gauche : le modèle validé. Au milieu : le premier ajustement. À droite : la correction.</figcaption></figure>

**Les effets.** Les concepts étaient super. Le build a transformé des dessins plats façon BD en découpes plates : 15 des 25 meshs d’effets n’avaient aucune épaisseur, et vu de la caméra de jeu, Going Live ressemblait à des rouleaux de scotch rose empilés. Une passe de profondeur tourne au moment où j’écris.

<div class="duo">
<figure><img src="../../../devlog/nyx/vfx-concept-golive.webp" alt="Concept de l’effet Going Live" loading="lazy"><figcaption>Going Live, le concept.</figcaption></figure>
<figure><img src="../../../devlog/nyx/vfx-ingame-flat.webp" alt="Going Live en jeu, qui ressemble à des anneaux roses plats" loading="lazy"><figcaption>Going Live, le premier build.</figcaption></figure>
</div>

## Tout sur une seule frise

Chaque prompt, chaque tâche et chaque vidéo, relus depuis le propre journal du coordinateur. Survolez la [version interactive](../../../devlog/nyx/timeline.html) (en anglais) pour lire chaque prompt et le détail de chaque tâche.

<figure><a href="../../../devlog/nyx/timeline.html"><img src="../../../devlog/nyx/timeline.webp" alt="Frise du fil Nyx : prompts, tâches d’agents, taille du contexte et appels d’outils sur 22 heures" loading="lazy"></a><figcaption>Les points sont mes prompts, les barres les tâches d’agents (turquoise Codex, orange Claude, hachuré les reprises). Le trou, c’est moi qui dors.</figcaption></figure>

- **14 de mes 21 prompts sont arrivés avant tout build.** Le goût, c’est la partie lente, et c’est la mienne.
- **Le coordinateur est resté léger.** Il a confié le gros du travail et n’a rempli son contexte que deux fois. Les deux fois, je l’ai compacté à une pause naturelle.
- **J’ai répondu vite quand ça comptait.** Mon temps de réponse médian était de 12 minutes. Pendant les corrections de la robe et de la colonne, 2 à 3.

<figure>
<video src="../../../devlog/nyx/ingame-combos.mp4" poster="../../../devlog/nyx/ingame-combos.webp" muted loop playsinline controls></video>
<figcaption>Les trois combos autour desquels le kit a été pensé, sur le mannequin de Training.</figcaption>
</figure>

## Les outils derrière

Nyx a pris 21 prompts parce que le jeu en avait déjà pris des milliers. Ici, un combattant, ce sont des données et pas du nouveau code, et chaque étape de son build a tourné sur des outils faits pour les combattants d’avant. Quatre d’entre eux font l’essentiel du travail.

### T3 Code : une fenêtre pour tous les agents

[T3 Code ↗](https://github.com/pingdotgg/t3code) est une application open source pour faire tourner des agents de code, faite par l’équipe de Ping.gg. J’y fais tourner des fils Claude et Codex côte à côte, tous sur la même copie du jeu. Deux choses ont rendu Nyx possible. Un fil peut confier une tâche à un nouveau fil chez l’un ou l’autre fournisseur, avec le modèle et l’effort qu’il choisit, et récupère le rapport quand c’est fini. Et les images, les pages et les vidéos s’affichent directement dans la conversation, donc je relis les planches de concepts, les prises d’animation et cette frise là où je discute, souvent depuis mon téléphone.

### pstack : comment les agents travaillent

[pstack ↗](https://github.com/backnotprop/pstack) est un pack gratuit de skills pour agents, écrit par poteto, ingénieur chez Cursor. Il donne aux agents une méthode au lieu d’une page blanche. Une tâche est aiguillée vers un playbook (enquêter, construire une fonctionnalité, corriger un bug), et chaque playbook porte des principes comme « prouve que ça marche sur le vrai truc » et « corrige la cause, pas le symptôme ». Il décide aussi quel modèle fait quel travail. Sur Nyx, Codex a construit l’essentiel et Claude Opus a pris les décisions de jugement et le travail moteur le plus dur. Et il oblige le coordinateur à tenir un journal de décisions : 40 lignes sur ce qu’il a décidé, pourquoi, et comment il a vérifié. Sans ce fichier, cette page n’aurait pas pu être écrite.

### La passerelle Unity : beaucoup d’agents, un seul éditeur

Comment autant d’agents ne se marchent-ils pas sur les pieds ? Presque tout ce qu’ils font finit dans un seul éditeur Unity : importer des modèles, cuire le combattant, lancer le Training, enregistrer des clips. Unity fait une chose à la fois. Si un agent lance une recompilation pendant qu’un autre enregistre une capture, les deux cassent.

J’ai donc construit une passerelle devant l’éditeur, sur un fork du package Pipeline d’Unity. Les agents ne pilotent jamais Unity directement. Un agent donne un lot à la passerelle, du genre « importe ces clips, cuis Nyx, ouvre le Training, enregistre le changement de forme », et reçoit un bail. Les autres font la queue. La passerelle vérifie qui demande, donc aucun agent ne peut utiliser le bail d’un autre, et elle recompile avant chaque lot pour que personne n’enregistre du code périmé. Quand je veux jouer, un interrupteur « Hold Editor for Me » me met en tête de file, et les agents attendent que j’aie fini.

<div class="queue" aria-hidden="true">
<div class="queue__line"><span class="queue__me">Moi · Play</span><span>Codex · importer les clips</span><span>Claude · cuire Nyx</span><span>Codex · filmer le swap</span></div>
<div class="queue__gate">Passerelle<small>un bail à la fois</small></div>
<div class="queue__editor">Éditeur Unity</div>
</div>

Le 29 octobre, voici ce trafic d’après les transcriptions, Nyx et les autres combattants confondus :

<div class="stats">
<div><b>~600</b>requêtes à la passerelle</div>
<div><b>47</b>sessions d’agents</div>
<div><b>1</b>éditeur Unity</div>
</div>

### GenRA : une IA qui anime avec du code

Personne n’anime ses mouvements à la main. Notre boîte à outils d’animation est un fork de [GenRA ↗](https://github.com/MacPaw/GenRA), une recherche de MacPaw signée Andrii Yaroshevych, Pavlo Kryven, Mariya Hirna et Maksym Shamrai (ECCV Workshops 2026). Leur idée, un modèle de langage qui anime un vrai rig articulation par articulation et écrit des fichiers prêts pour la production, est ce qui a rendu l’animation possible pour un jeu fait par une seule personne. Elle a débloqué tout le projet, et c’est pour ça que leur nom est à côté de Tripo et Mixamo en haut de cette page.

Notre version fait écrire chaque coup à Claude Opus sous forme d’un petit programme, sur son vrai squelette : des poses clés, des bras et des jambes résolus pour que les articulations ne plient que dans le bon sens, puis le mouvement entre les poses.

Ensuite, elle vérifie son propre travail. Des os qui s’étirent, des genoux qui plient à l’envers, des membres qui sautent, des mains qui traversent le corps, et ce qu’on appelle le flow : les arrêts raides et les poses mortes qui donnent un mouvement de robot. Elle fait un rendu du coup, regarde les images et corrige ce qu’elle voit. Ce qui m’arrive, c’est le tableau plus haut : chaque coup sous trois angles avec ses résultats de vérification. Un coup coûte entre un et trois dollars.

### Et le design d’abord

Rien de tout ça n’aide si les agents doivent deviner. Le look et le kit de Nyx étaient fixés avant la première tâche de build. Quand les agents savent exactement ce que vous voulez, ils vont vite. Quand ils devinent, vous obtenez une robe abat-jour.

Nyx n’est pas encore dans le build de playtest. [Ajoutez SLOPArena à votre liste de souhaits sur Steam ↗](https://store.steampowered.com/app/5324910/) ou rejoignez le [Discord ↗](https://discord.gg/VvfaxDCF6Z) pour savoir quand elle arrive.
