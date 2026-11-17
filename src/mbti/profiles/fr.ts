import type { TypeProfiles } from './schema';

/**
 * Profils français des 16 types.
 *
 * Traduction naturelle et non littérale de la version anglaise : chaque profil
 * décrit des tendances, dans un langage équilibré et sans jugement.
 */
export const PROFILES_FR: TypeProfiles = {
  ISTJ: {
    nickname: 'Le gardien méthodique',
    tagline: 'Discrètement fiable, et précis sur ce qui compte vraiment.',
    overview:
      "Les tendances ISTJ associent une mémoire précise du fonctionnement réel des choses à un goût pour un monde extérieur organisé et décidé. Les personnes qui s'y reconnaissent deviennent souvent celles à qui l'on fait confiance pour se rappeler la vraie procédure et tenir ce qui a été promis.",
    strengths: [
      'Rigueur et exactitude dans le détail, surtout là où la précision compte réellement',
      'Tient ses engagements sans qu’il faille le lui rappeler',
      'Construit et entretient des systèmes, des archives et des routines fiables',
      'Reste calme et stable quand les autres réagissent à la pression',
    ],
    weaknesses: [
      'Peut écarter trop vite une idée nouvelle faute de précédent',
      'Peut sembler rigide lorsque les circonstances ont réellement changé',
      'Porte parfois bien trop de choses seul(e) au lieu de déléguer',
      'Suppose que la reconnaissance va de soi et ne l’exprime pas',
    ],
    communication:
      'Directe, précise et économe : énonce les faits et l’engagement plutôt que de réfléchir à voix haute.',
    decisions:
      'Compare ce qui a fonctionné de façon fiable à des critères clairs, puis décide et s’y tient.',
    social:
      'Préfère un petit cercle de relations anciennes aux vastes réseaux, et montre son attachement par la fiabilité plutôt que par les démonstrations.',
    work: "Donne le meilleur avec des attentes claires, le temps de bien faire, et un apprentissage progressif ancré dans des exemples concrets.",
    growth: [
      'Demandez ce qu’une idée inhabituelle rendrait possible avant de juger si elle a fait ses preuves',
      'Dites la reconnaissance que vous croyez déjà évidente',
      'Voyez la délégation comme une façon de faire grandir les autres, non comme une perte de contrôle',
    ],
  },

  ISTP: {
    nickname: 'Le dépanneur concret',
    tagline: 'Comprend comment ça marche en le démontant.',
    overview:
      "Les tendances ISTP associent une analyse intérieure précise à une conscience aiguë de la situation physique immédiate. Ces personnes apprennent souvent en faisant, gardent un calme remarquable dans une vraie urgence, et cherchent la réparation la plus économique plutôt que la plus élaborée.",
    strengths: [
      'Diagnostique vite et juste les problèmes pratiques en conditions réelles',
      'Garde son sang-froid et son efficacité en situation de crise',
      'Apprend outils, machines et gestes techniques avec une rapidité inhabituelle',
      'Va à la solution la plus simple qui fonctionne, sans complication inutile',
    ],
    weaknesses: [
      'Peut se désengager des projets et engagements à long terme qui paraissent abstraits',
      'Peut sembler distant(e) quand on attend une réponse émotionnelle et non une solution',
      'Repousse les conversations sur les sentiments au lieu de les avoir',
      'Peut prendre un risque physique parce qu’il est intéressant plutôt que nécessaire',
    ],
    communication:
      'Sobre et littérale : dit ce qu’il faut quand il le faut, et montre plus volontiers qu’il n’explique.',
    decisions:
      'Analyse la mécanique de la situation réelle et agit dès que le geste utile est clair, en ajustant au fur et à mesure.',
    social:
      'À l’aise avec les autres autour d’une activité partagée, et attaché à une grande liberté personnelle, même dans les relations proches.',
    work: "Donne le meilleur avec de l'autonomie, des outils réels et un retour immédiat ; apprend en essayant plutôt qu’en écoutant.",
    growth: [
      'Nommez une émotion à un proche avant qu’elle ne devienne un problème à résoudre',
      'Engagez-vous sur un objectif de long terme et gardez une trace visible de votre progression',
      'Demandez-vous si un risque en vaut la peine, pas seulement s’il est gérable',
    ],
  },

  ISFJ: {
    nickname: 'Le protecteur discret',
    tagline: 'Se souvient de ce dont vous aviez besoin, et s’assure discrètement que vous l’ayez.',
    overview:
      "Les tendances ISFJ associent une mémoire détaillée des personnes et des situations à un souci concret du bien-être d'autrui. Ces personnes repèrent souvent la chose précise qui aiderait, et la font simplement, sans annoncer qu'elles l'ont faite.",
    strengths: [
      'Remarque ce dont chacun a réellement besoin, et non ce qu’il est censé vouloir',
      'Maintient une attention pratique constante sur de longues périodes',
      'Conserve l’histoire détaillée d’un groupe, d’une famille ou d’une équipe',
      'Crée des environnements calmes et ordonnés où l’on se sent pris en charge',
    ],
    weaknesses: [
      'Accepte plus que ce qui est tenable plutôt que de refuser',
      'Garde ses blessures pour soi jusqu’à ce que le ressentiment s’installe',
      'Peut résister à un changement pourtant nécessaire parce que l’ancien cadre rassurait',
      'Minimise sa contribution et laisse le mérite à d’autres',
    ],
    communication:
      'Chaleureuse, attentionnée et concrète : mesure l’effet de ses mots avant de les dire.',
    decisions:
      'Met en balance les réalités pratiques et l’effet sur les personnes concernées, en accordant du poids au précédent.',
    social:
      'Investit profondément quelques relations proches et préfère les petits cercles familiers aux grandes réunions.',
    work: "Donne le meilleur dans un cadre stable et coopératif, avec des attentes claires et une reconnaissance visible ; apprend régulièrement à partir de supports concrets et bien structurés.",
    growth: [
      'Entraînez-vous à refuser une demande par semaine, sans longue justification',
      'Exprimez une contrariété tant qu’elle est encore petite',
      'Dites à voix haute ce que vous avez apporté, au lieu d’attendre qu’on le remarque',
    ],
  },

  ISFP: {
    nickname: 'Le créateur sensible',
    tagline: 'Vit selon des valeurs intimes, et les montre dans ce qu’il fait.',
    overview:
      "Les tendances ISFP associent des valeurs personnelles profondes à une attention fine à la texture du moment présent. Ces personnes s'expriment souvent par l'action, l'artisanat ou le soin plutôt que par les mots, et ont besoin que leur quotidien soit cohérent avec ce qu'elles croient.",
    strengths: [
      'Sens des valeurs personnelles solide, qui tient sous la pression',
      'Sensibilité esthétique et sensorielle aiguë : perçoit ce qui rend une chose juste',
      'Tact et acceptation envers les autres, sans volonté de les contrôler',
      'S’adapte avec souplesse et reste pragmatique quand les plans changent',
    ],
    weaknesses: [
      'Évite le conflit jusqu’à ce que la situation soit plus difficile à réparer',
      'Peut prendre une critique du travail comme une critique de soi',
      'Trouve la planification à long terme et la mise en avant de soi réellement épuisantes',
      'Peut se retirer plutôt que d’exprimer un besoin directement',
    ],
    communication:
      'Discrète et personnelle : montre sa chaleur par un geste attentionné plus volontiers qu’en la décrivant.',
    decisions:
      'Confronte un choix à ses valeurs intérieures et à ce qui sonne juste en pratique, plutôt qu’à une règle abstraite.',
    social:
      'Chaleureux(se) en tête-à-tête, sélectif(ve) dans l’intimité, et mal à l’aise au centre de l’attention d’un grand groupe.',
    work: "Donne le meilleur avec de la liberté, un savoir-faire ou une cause qui lui tient à cœur, et peu de bureaucratie ; apprend en faisant quelque chose de réel.",
    growth: [
      'Dites la chose difficile tant qu’elle est encore petite',
      'Distinguez le retour sur le travail du jugement sur vous',
      'Fixez un objectif modeste à long terme et découpez-le en étapes visibles',
    ],
  },

  INFJ: {
    nickname: 'Le visionnaire discret',
    tagline: 'Pressent où vont les gens et les situations, bien avant que cela ne soit visible.',
    overview:
      "Les tendances INFJ associent une lecture intérieure des dynamiques en cours à une véritable chaleur humaine. Ces personnes gardent souvent une vision à long terme de ce qui pourrait être meilleur pour les autres, et y travaillent avec plus d'intensité qu'elles n'en montrent.",
    strengths: [
      'Perçoit finement les motivations et les besoins non exprimés',
      'Garde un cap à long terme et y travaille avec constance',
      'Décrit avec une clarté rare des situations humaines complexes',
      'Noue des relations en tête-à-tête profondes et réellement soutenantes',
    ],
    weaknesses: [
      'Attend des autres qu’ils comprennent des allusions jamais formulées clairement',
      'Dépasse ses propres limites jusqu’à l’épuisement',
      'Peut être perfectionniste et tarder à montrer un travail inachevé',
      'Peut se retirer brutalement d’une relation plutôt que d’affronter une rupture de confiance',
    ],
    communication:
      'Réfléchie, nuancée et chaleureuse : préfère les échanges de fond aux conversations de surface, et écrit souvent plus aisément qu’elle ne parle.',
    decisions:
      'Laisse une impression mûrir, la confronte à ses valeurs profondes, puis s’engage fermement une fois la conviction installée.',
    social:
      'A besoin de beaucoup de solitude, noue peu d’attachements mais très profonds, et se fatigue vite en foule.',
    work: "Donne le meilleur avec de l'autonomie, une finalité à laquelle croire et du calme pour penser ; apprend en reliant les idées à un sens plus large.",
    growth: [
      'Exprimez explicitement vos besoins au lieu d’espérer qu’on les devine',
      'Protégez votre repos avant que l’épuisement ne l’impose',
      'Montrez un travail « bien » plutôt que « parfait », et laissez les retours le terminer',
    ],
  },

  INFP: {
    nickname: 'L’idéaliste intérieur',
    tagline: 'Mesure le monde à ce qu’il pourrait être, et tâche de vivre en conséquence.',
    overview:
      "Les tendances INFP associent une boussole morale intime à une imagination qui ne cesse de produire des possibles pour les personnes. Ces personnes tiennent intensément à l'authenticité — en elles-mêmes, dans leur travail et leurs relations — et ressentent vivement l'écart entre le réel et l'idéal.",
    strengths: [
      'Valeurs profondes qui donnent direction et résistance au travail choisi',
      'Imagination originale, surtout sur les possibles humains',
      'Empathie sincère, sans volonté de diriger les autres',
      'Ouverture d’esprit à la diversité des façons d’être',
    ],
    weaknesses: [
      'Autocritique au point de bloquer le travail avant son achèvement',
      'Commence plus de projets qu’il n’en termine réellement',
      'Prend personnellement une critique impersonnelle',
      'Peut se réfugier dans la version idéale plutôt que d’affronter la version concrète',
    ],
    communication:
      'Douce, expressive et imagée : s’ouvre lentement, et dit l’essentiel par écrit ou auprès de personnes de confiance.',
    decisions:
      'Confronte d’abord les options à ses valeurs et à son exigence d’authenticité, ce qui rend difficile un arbitrage purement pragmatique.',
    social:
      'Tient à quelques liens authentiques, se méfie de la superficialité, et a besoin de solitude régulière pour récupérer.',
    work: "Donne le meilleur sur un sujet personnellement signifiant, avec de la souplesse et peu de supervision rigide ; apprend par l'imaginaire, le récit et le lien personnel à la matière.",
    growth: [
      'Terminez entièrement une chose imparfaite avant d’en commencer une autre',
      'Traitez une critique du travail comme une information, non comme un verdict sur vous',
      'Traduisez un idéal en une étape concrète réalisable cette semaine',
    ],
  },

  INTJ: {
    nickname: 'Le stratège de long terme',
    tagline: 'Conçoit le système, puis construit méthodiquement vers lui.',
    overview:
      "Les tendances INTJ associent une intuition intérieure de l'évolution des choses à une volonté d'organiser efficacement le monde extérieur vers cet objectif. Ces personnes travaillent souvent à partir d'un modèle indépendant de ce qui devrait fonctionner, et acceptent de restructurer l'existant pour y parvenir.",
    strengths: [
      'Pense plusieurs coups à l’avance et planifie à rebours depuis un objectif lointain',
      'Jugement indépendant, qui n’a pas besoin de consensus pour avancer',
      'Élimine ce qui ne contribue pas à l’objectif',
      'Maîtrise des systèmes complexes et les tient comme un tout cohérent',
    ],
    weaknesses: [
      'Peut négliger le coût humain et émotionnel d’un plan efficace',
      'Impatience envers ceux qui avancent à un autre rythme ou demandent plus d’explications',
      'Excès de confiance dans son propre modèle, et lenteur à créditer les vues concurrentes',
      'Réticence à s’engager avant que le plan ne soit entièrement formé',
    ],
    communication:
      'Concise, structurée et franche sur le fond : livre la conclusion plus volontiers que le raisonnement.',
    decisions:
      'Construit un modèle d’ensemble, le confronte à l’objectif de long terme, et décide de façon indépendante.',
    social:
      'Garde un cercle restreint et choisi, préfère les échanges de fond, et considère la plupart des mondanités comme facultatives.',
    work: "Donne le meilleur avec de l'autonomie, des collègues compétents et un problème réellement difficile ; apprend le plus vite en construisant un cadre puis en le testant.",
    growth: [
      'Demandez comment un plan sera vécu par ceux qui devront l’appliquer',
      'Montrez votre raisonnement pour que les autres puissent suivre et contribuer',
      'Laissez un bon plan démarrer avant d’être parfait, et ajustez en marchant',
    ],
  },

  INTP: {
    nickname: 'Le bâtisseur de théories',
    tagline: 'Démonte les idées pour trouver le principe qui les soutient.',
    overview:
      "Les tendances INTP associent une analyse intérieure précise à une imagination qui produit sans cesse des possibilités théoriques. Ces personnes sont souvent mues par le plaisir de comprendre correctement, et réviseront volontiers une position ancienne dès que la logique l'exige.",
    strengths: [
      'Pensée rigoureuse et précise, qui met au jour les présupposés cachés',
      'Produit des rapprochements théoriques réellement originaux entre domaines',
      'Honnêteté intellectuelle : change d’avis quand l’argument l’impose',
      'À l’aise avec l’ambiguïté et les questions sans réponse',
    ],
    weaknesses: [
      'Affine l’analyse bien au-delà du moment où il fallait agir',
      'Perd l’intérêt dès qu’un problème est résolu en principe mais pas en pratique',
      'Peut corriger de petites inexactitudes d’une façon ressentie comme cassante',
      'Néglige les obligations pratiques et administratives courantes',
    ],
    communication:
      'Précise, nuancée et exploratoire : définit soigneusement les termes et peut sembler contredire alors qu’elle teste une idée.',
    decisions:
      'Garde les options ouvertes en examinant la structure logique, ce qui peut retarder une décision déjà suffisamment étayée.',
    social:
      'Apprécie quelques personnes qui aiment les idées, trouve les obligations sociales fatigantes, et reste discret(e) sur ses émotions.',
    work: "Donne le meilleur avec de la liberté intellectuelle, peu de réunions et des problèmes conceptuels ardus ; apprend en interrogeant le cadre plutôt qu'en le mémorisant.",
    growth: [
      'Fixez une échéance à l’analyse et agissez sur la meilleure réponse disponible',
      'Terminez les derniers dix pour cent, peu gratifiants, d’un projet',
      'Demandez-vous si une correction est utile ici avant de la faire',
    ],
  },

  ESTP: {
    nickname: 'Le réactif pragmatique',
    tagline: 'Lit la situation, évalue le risque, et agit.',
    overview:
      "Les tendances ESTP associent une conscience aiguë de ce qui se passe réellement à une analyse pratique rapide. Ces personnes sont souvent à leur meilleur quand la situation est vivante et non scénarisée, et règlent souvent les choses pendant que les autres planifient encore.",
    strengths: [
      'Conscience situationnelle exceptionnelle et réaction pratique immédiate',
      'Négocie et improvise bien sous pression réelle',
      'Dynamise un groupe et relance ce qui était bloqué',
      'Pragmatisme : se concentre sur ce qui marchera maintenant',
    ],
    weaknesses: [
      'Peut agir avant d’avoir considéré les conséquences à long terme',
      'S’ennuie dans la maintenance et le suivi au long cours',
      'Peut être direct(e) d’une façon qui heurte plus que prévu',
      'Sous-estime le risque parce que l’improvisation a réussi par le passé',
    ],
    communication:
      'Directe, imagée et informelle : va droit au but et assume le désaccord ouvert.',
    decisions:
      'Lit la situation concrète et agit vite, en comptant sur la possibilité de corriger en route.',
    social:
      'Sociable et à l’aise avec les nouvelles rencontres, apprécie la compagnie autour d’une activité, et préfère faire que discuter.',
    work: "Donne le meilleur avec de la variété, des résultats visibles et peu de procédures rigides ; apprend par la pratique et le retour immédiat.",
    growth: [
      'Avant d’agir, nommez une conséquence qui apparaîtrait dans un mois',
      'Installez une routine ennuyeuse que vous tenez quel que soit votre intérêt',
      'Vérifiez l’effet de votre franchise au lieu de le supposer sans conséquence',
    ],
  },

  ESTJ: {
    nickname: 'L’organisateur pragmatique',
    tagline: 'Fixe la norme, répartit le travail, livre le résultat.',
    overview:
      "Les tendances ESTJ associent la volonté d'organiser efficacement le monde extérieur à un respect détaillé de ce qui a fait ses preuves. Ces personnes prennent souvent naturellement le rôle de coordination et sont celles sur qui l'on compte pour transformer une intention en résultat mesurable.",
    strengths: [
      'Transforme des intentions floues en plans, rôles et échéances clairs',
      'Décide et assume la responsabilité du choix',
      'Applique les standards de façon constante et équitable pour tous',
      'Livre de façon fiable sur la logistique et l’opérationnel que d’autres trouvent fastidieux',
    ],
    weaknesses: [
      'Peut décider assez vite pour manquer une meilleure option encore en formation',
      'Peut faire primer la procédure sur une exception légitime',
      'Néglige parfois la façon dont une décision est vécue par ceux qui l’appliquent',
      'Impatience face à l’ambiguïté et aux idées pas encore praticables',
    ],
    communication:
      'Claire, directive et précise : énonce ses attentes sans détour et attend la même chose en retour.',
    decisions:
      'Applique des critères établis et des précédents éprouvés, puis tranche rapidement et passe à l’exécution.',
    social:
      'Sociable et impliqué(e) dans la vie collective, organisant souvent la rencontre plutôt que d’y assister seulement.',
    work: "Donne le meilleur avec une autorité claire, des objectifs mesurables et des processus ordonnés ; apprend mieux à partir de contenus structurés et directement applicables.",
    growth: [
      'Posez une question de plus avant de clore une décision',
      'Voyez une exception comme une information sur la règle, non comme une menace',
      'Demandez comment un changement est vécu par ceux qui l’appliquent',
    ],
  },

  ESFP: {
    nickname: 'L’improvisateur chaleureux',
    tagline: 'Ramène les gens dans l’instant, et le rend agréable.',
    overview:
      "Les tendances ESFP associent un engagement vif dans le présent à des valeurs personnelles chaleureuses. Ces personnes relèvent naturellement l'ambiance d'une pièce, remarquent qui est laissé de côté, et préfèrent vivre quelque chose ensemble plutôt que d'en parler abstraitement.",
    strengths: [
      'Crée une chaleur et un plaisir qui font mieux fonctionner les groupes',
      'Très attentif(ve) à l’état réel des personnes sur le moment',
      'Débrouillard(e) et concret(ète) quand il faut régler quelque chose tout de suite',
      'S’adapte facilement et rebondit vite après un revers',
    ],
    weaknesses: [
      'Évite ou repousse les conversations difficiles et la planification lointaine',
      'Peut être détourné(e) par ce qui est le plus immédiatement captivant',
      'Prend la critique personnellement, surtout de la part de personnes appréciées',
      'Peut trop s’engager socialement et laisser en plan un travail moins visible',
    ],
    communication:
      'Chaleureuse, expressive et narrative : perçoit vite la température émotionnelle d’une pièce et y répond.',
    decisions:
      'Choisit ce qui paraît juste pour les personnes présentes, parfois au détriment des conséquences lointaines.',
    social:
      'Aime sincèrement les gens et les nouvelles rencontres, et offre une attention généreuse à qui se trouve devant lui(elle).',
    work: "Donne le meilleur dans des rôles variés, concrets et tournés vers les personnes, avec des résultats immédiats ; apprend en faisant, en échangeant et par des exemples réels.",
    growth: [
      'Ayez la conversation délicate cette semaine plutôt que la prochaine',
      'Mettez par écrit un engagement futur et protégez le temps nécessaire',
      'Entendez la critique du travail comme distincte de l’affection qu’on vous porte',
    ],
  },

  ESFJ: {
    nickname: 'L’hôte attentionné',
    tagline: 'S’occupe des personnes et des détails pratiques en même temps.',
    overview:
      "Les tendances ESFJ associent une attention tournée vers les besoins d'autrui et l'harmonie du groupe à une mémoire pratique détaillée. Ces personnes deviennent souvent le centre organisateur d'une famille, d'une équipe ou d'une communauté, et veillent réellement à ce que personne ne soit oublié.",
    strengths: [
      'Crée chaleur, cohésion et sentiment d’appartenance dans un groupe',
      'Fiable sur les détails pratiques qui soutiennent les personnes',
      'Lit et gère les dynamiques sociales avec rapidité et tact',
      'Tient ses engagements envers les autres avec constance',
    ],
    weaknesses: [
      'Prend le désaccord personnellement et peut l’aplanir trop tôt',
      'Dépend de l’approbation d’autrui plus qu’il(elle) n’aime l’admettre',
      'Peut supposer que sa façon d’aider est celle qu’on attend',
      'Néglige ses propres besoins en s’occupant de ceux de tous',
    ],
    communication:
      'Chaleureuse, encourageante et pleine de tact : soigne le ton et adoucit volontiers les passages difficiles.',
    decisions:
      'Pèse l’effet sur les personnes et sur l’harmonie du groupe, guidé(e) fortement par les valeurs établies et le précédent.',
    social:
      'Aime sincèrement être entouré(e), entretient activement ses relations, et fait souvent le travail qui maintient un groupe soudé.',
    work: "Donne le meilleur dans des rôles coopératifs, structurés et centrés sur l'humain, avec des attentes claires et de la reconnaissance ; apprend bien dans des cadres organisés et conviviaux.",
    growth: [
      'Laissez un désaccord ouvert assez longtemps pour être réglé correctement',
      'Demandez quelle aide on souhaite au lieu d’offrir celle que vous voudriez',
      'Planifiez quelque chose rien que pour vous, et tenez-le',
    ],
  },

  ENFP: {
    nickname: 'L’étincelle de possibles',
    tagline: 'Voit ce qu’une personne ou une idée pourrait devenir, et l’allume.',
    overview:
      "Les tendances ENFP associent une imagination tournée vers l'extérieur à des valeurs personnelles chaleureuses. Ces personnes produisent vite des possibilités, relient des gens et des idées sans lien apparent, et tiennent surtout à un travail fidèle à ce qu'elles croient.",
    strengths: [
      'Produit rapidement des idées et des possibilités originales',
      'Enthousiasme qui mobilise réellement les autres',
      'Perçoit et révèle le potentiel des personnes',
      'Relie idées, domaines et personnes par-delà les frontières',
    ],
    weaknesses: [
      'Commence bien plus de choses qu’il(elle) n’en termine',
      'Perd l’élan une fois passé le début enthousiasmant',
      'Trouve le détail, la routine et l’administratif réellement difficiles à tenir',
      'Peut trop s’engager par enthousiasme, puis se sentir piégé(e)',
    ],
    communication:
      'Animée, chaleureuse et digressive : pense à voix haute, suit les chemins de traverse, et donne aux gens le sentiment d’être vus.',
    decisions:
      'Explore largement et confronte les options à ses valeurs, ce qui peut laisser une décision ouverte plus longtemps qu’utile.',
    social:
      'Se lie facilement dans des milieux très différents, et a besoin d’un peu de solitude pour récupérer d’un engagement constant.',
    work: "Donne le meilleur avec de la variété, de l'autonomie, du contact humain et une cause qui compte ; apprend par l'exploration, la conversation et les rapprochements d'idées.",
    growth: [
      'Choisissez un projet et traversez-en le milieu ennuyeux',
      'Mettez en place une structure externe pour l’administratif que vous ne ferez pas seul(e)',
      'Marquez un temps d’arrêt avant d’accepter, et confrontez l’engagement à votre charge actuelle',
    ],
  },

  ENFJ: {
    nickname: 'Le révélateur de talents',
    tagline: 'Voit qui quelqu’un pourrait devenir, et l’aide à y arriver.',
    overview:
      "Les tendances ENFJ associent une attention tournée vers les personnes à une lecture anticipatrice de ce qui se prépare. Ces personnes prennent une vraie responsabilité dans la croissance des autres, et savent formuler une finalité commune d'une façon qui met un groupe en mouvement.",
    strengths: [
      'Formule une vision partagée qui motive réellement',
      'Mentor perspicace, qui développe les autres délibérément',
      'Construit la coopération et désamorce les frictions entre personnes',
      'Organise l’effort collectif vers un but qui a du sens',
    ],
    weaknesses: [
      'Porte la responsabilité des problèmes d’autrui au-delà de l’utile',
      'Peut trop encadrer la progression des autres au lieu de les laisser trouver leur voie',
      'Évite le conflit menaçant l’harmonie jusqu’à ce qu’il soit tardif',
      'Néglige ses propres besoins et masque ses propres difficultés',
    ],
    communication:
      'Chaleureuse, claire et persuasive : s’adresse à ce qui compte pour l’interlocuteur et excelle à encourager.',
    decisions:
      'Pèse les conséquences humaines au regard d’une finalité de long terme, et préfère les décisions que le groupe peut s’approprier.',
    social:
      'Trouve son énergie auprès des autres et s’investit profondément dans ses relations, tout en ayant plus besoin de calme qu’on ne l’imagine.',
    work: "Donne le meilleur dans des rôles collaboratifs et porteurs de sens, avec la latitude de faire grandir les gens ; apprend bien par l'échange et en enseignant.",
    growth: [
      'Laissez quelqu’un résoudre son propre problème sans intervenir',
      'Nommez un conflit tôt plutôt que de préserver une harmonie de surface',
      'Dites à un proche ce qui vous pèse réellement',
    ],
  },

  ENTP: {
    nickname: 'Le contradicteur créatif',
    tagline: 'Retourne une évidence pour voir de quoi elle a l’air de l’autre côté.',
    overview:
      "Les tendances ENTP associent une production d'idées tournée vers l'extérieur à une analyse intérieure précise. Ces personnes aiment éprouver une position en la contestant, reformulent les problèmes de façon inattendue, et repèrent souvent l'option à laquelle personne n'avait pensé.",
    strengths: [
      'Reformule les problèmes de sorte que de nouvelles options apparaissent',
      'Pensée rapide et souple dans le débat et la résolution en direct',
      'Remet en cause des présupposés que tout le monde avait acceptés',
      'Produit et prototype des idées rapidement',
    ],
    weaknesses: [
      'Poursuit un débat bien après qu’il a cessé d’être utile',
      'Laisse la mise en œuvre à d’autres dès que ce n’est plus intéressant',
      'Peut négliger l’effet d’une contestation sur la personne qui la reçoit',
      'Résiste à la routine, à la structure et au suivi',
    ],
    communication:
      'Vive, joueuse et provocatrice : apprécie le débat pour lui-même et peut défendre une position qu’elle ne soutient pas.',
    decisions:
      'Génère des alternatives et les éprouve logiquement, quitte à rouvrir une décision déjà solide.',
    social:
      'Sociable et largement connecté(e), attiré(e) par les gens qui répliquent, et vite lassé(e) par la répétition.',
    work: "Donne le meilleur avec de la nouveauté, du défi intellectuel et peu de bureaucratie ; apprend en questionnant, en débattant et en prototypant.",
    growth: [
      'Demandez-vous si un débat sert le problème ou seulement votre intérêt pour lui',
      'Menez une idée jusqu’à la livraison complète',
      'Vérifiez l’effet d’une objection sur la personne, pas seulement sa justesse',
    ],
  },

  ENTJ: {
    nickname: 'Le stratège entraînant',
    tagline: 'Fixe l’objectif, bâtit la structure, et conduit jusqu’au bout.',
    overview:
      "Les tendances ENTJ associent la volonté d'organiser efficacement le monde extérieur à une lecture de long terme de ce qui vient. Ces personnes prennent la direction quand elle manque, et acceptent des décisions impopulaires au service d'un but auquel elles croient.",
    strengths: [
      'Donne un cap clair et mobilise personnes et moyens derrière lui',
      'Décide dans l’incertitude et assume le résultat',
      'Pense stratégiquement les conséquences et les structures de long terme',
      'Affronte les problèmes directement au lieu de les laisser durer',
    ],
    weaknesses: [
      'Peut écraser les contributions discrètes et confondre obéissance et adhésion',
      'Impatience envers les procédures, les émotions et ceux qui ont besoin de plus de temps',
      'Peut traiter une idée naissante comme une position à abattre',
      'Se surcharge, et surcharge les autres, au service de l’objectif',
    ],
    communication:
      'Énergique, structurée et franche : argumente directement, attend la contradiction, et déteste le flou.',
    decisions:
      'Tranche vite selon des critères objectifs et une stratégie de long terme, parfois avant l’arrivée d’éléments plus lents.',
    social:
      'À l’aise pour diriger et réseauter, apprécie la compétence chez ses interlocuteurs, et réserve l’intimité à un petit cercle.',
    work: "Donne le meilleur avec de l'autorité, des objectifs ambitieux et des collègues compétents ; apprend vite par le défi, le débat et les enjeux réels.",
    growth: [
      'Interrogez la personne la plus silencieuse avant de clore la discussion',
      'Distinguez celui qui a besoin de temps de celui qui vous résiste',
      'Définissez ce que « suffisant » veut dire, pour vous et pour votre équipe',
    ],
  },
};
