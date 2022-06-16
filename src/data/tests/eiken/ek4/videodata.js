const videos = {
  test: "英検4級",
  testid: "EK4",
  slug: "/EK4/",
  tnslug: "/EK4/EK4TN/EK4TN-",
  videoContent: [
    {
      day: "1",
      id: "1",
      title: "「英検®4級」ってどんなしけん？",
      section: "コースの しょうかい",
      shortDesc:
        "はじめて 英検®を うける ひとにも わかりやすく 英検®が どんな しけん なのか かいせつ します。",
      longDesc:
        "しけんの むずかしさ、しけんのじかん、かいとうようしに かくこと、もちもの など、よくある みなさんの ぎもんに おこたえします。さらに、それぞれの もんだいの かたちも くわしく しょうかいします。このレッスンを みれば ふあんが なくなること まちがいなし！",
    },
    {
      day: "2",
      id: "2",
      title: "「ひんし」のそうふくしゅう！",
      section: "ぶんぽうの かいせつ",
      shortDesc:
        "みなさんが いままでに ならった ひんしを ひとつ ひとつ ふくしゅう しましょう。",
      longDesc:
        "えいごの ぶんぽうの きそを しっかりと りかいする だいいっぽは ひんしを しっかりと りかいすることです。いままでに ならった ひんしの やくわりや つかいかた、ルールを れいぶんを つかって おさらい しましょう。",
    },
    {
      day: "3",
      id: "3",
      title: "Day3",
      section: "ぶんぽうの かいせつ",
      shortDesc:
        "かこけいの いみ だけではなく、ぎもんぶん や ひていぶんの つくりかたも かいせつします。",
      longDesc:
        "どうしの かたちの かわりかたが ふきそくなことが あるため、にがていしきを もつひとも いるかも しれません。また、かこけいと かこしんこうけい の ちがいが わかりづらいという ひとも いるかも しれません。れいぶんを つかって わかりやすく かいせつします。",
    },
    {
      day: "4",
      id: "4",
      title: "「みらいけい」のつかいかた",
      section: "ぶんぽうの かいせつ",
      shortDesc:
        "みらいけいの いみ だけではなく、ぎもんぶん や ひていぶんの つくりかたも かいせつします。",
      longDesc:
        'みらいけいには "be going to" と "will" のふたつが あります。いみは にていますが、しつもんぶんや ぎもんぶんの つくりかたや こまかい ニュアンスが ことなります。まずは きほんてきな いみを おさえて、くわしい ちがいを みていきましょう。',
    },
    {
      day: "5",
      id: "5",
      title: "けいようしの「ひかくきゅう」と「さいじょうきゅう」",
      section: "ぶんぽうの かいせつ",
      shortDesc:
        "４級から けいようし の あたらしい かたちが とうじょう します。くわしく みてみましょう。",
      longDesc:
        "ひかくきゅう と さいじょうきゅう は、その かたちを つくるのに ひつような たんごが おおいため、あなうめ もんだいや ならびかえ もんだいで まちがえがちな ぶんぽうです。れいぶんに なれることで ただしい ぶんを えれべるように なりましょう。",
    },
    {
      day: "6",
      id: "6",
      title: "「じょどうし」のつかいかた",
      section: "ぶんぽうの かいせつ",
      shortDesc:
        "４級から さまざまな いみを もつ じょどうしが とうじょう します。くわしく みてみましょう。",
      longDesc:
        "じょどうしは しゅるいが おおく あるので、こんらん してしまう ひとも おおいかも しれません。しかし、ひていぶんの つくりかたや ぎもんぶんの つくりかたは ふくざつでは ないので、ひょうげんも あわせて つかいこなせるように しましょう。",
    },
    {
      day: "7",
      id: "7",
      title: "「どうめいし」のつかいかた",
      section: "ぶんぽうの かいせつ",
      shortDesc:
        '５級までは "~ing" げんざいしんこうけい でしか つかいませんでした。ほかの つかいかたを みてみましょう。',
      longDesc:
        "えいごの ひとつの せつ には どうしを ひとつまでしか いれることが できません。そこで じゅうように なるのが どうめいしです。「～すること」という いみになり どうしを めいしとして つかうことが できます。",
    },
    {
      day: "8",
      id: "8",
      title: "「toふていし」のつかいかた",
      section: "ぶんぽうの かいせつ",
      shortDesc:
        "toふていし は とても べんりな えいごの ひょうげん です。くわしく みてみましょう。",
      longDesc:
        "toふていし は、つくりは かんたんですが、つかいかたが なんしゅるいか あるので いみを りかいするのが むずかしいと かんじるかも しれません。しかし、こんかいの レッスンでは すべての つかいかたの かいせつを するので ごあんしん ください。",
    },
    {
      day: "9",
      id: "9",
      title: "「there is / there are」のつかいかた",
      section: "ぶんぽうの かいせつ",
      shortDesc:
        '４級から よく めにする "there is / there are" の いみや つかいかたを みてみましょう。',
      longDesc:
        '"there is / there are" は、みたことが ないと いみが まったく わからないかも しれません。しかし、じつは いみは「～がある」という とても シンプルな ものです。ひていぶんや ぎもんぶんの つくりかたも むずかしくは ないので、いっしょに おさらい しましょう。',
    },
    {
      day: "10",
      id: "10",
      title: "「せつぞくし」のつかいかた",
      section: "ぶんぽうの かいせつ",
      shortDesc:
        "４級から ぶんと ぶんが つながって ひとつの ぶんに なった ぶんが でてきます。くわしく みてみましょう。",
      longDesc:
        "せつぞくしは ふたつの ことばや ぶんを つなげる はたらきのある ことばです。しゅるいも あまり おおくは ないですが、ぶんの ながれを りかいするうえで とっても じゅうような ことばです。れいぶんを みながら いみを おさえましょう。",
    },
    {
      day: "11",
      id: "11",
      title: "「せつぞくし」のつかいかた",
      section: "ひっきもんだいのかいせつ",
      shortDesc:
        "ひっき１は みじかい ぶんの あなうめの もんだいです。くわしく みてみましょう。",
      longDesc:
        "ひっき１では たんごの ちしき だけでなく じゅつごの ちしきや ぶんぽうの ちしきも もとめられます。じっさいに もんだいを とおして、せいかいが なぜ せいかいなのか、そして まちがいが なぜ まちがいなのかを かいせつします。",
    },
    {
      day: "12",
      id: "12",
      title: "ひっき２れんしゅうとかいせつ",
      section: "ひっきもんだいのかいせつ",
      shortDesc:
        "ひっき２は ながい ぶんの あなうめの もんだいです。くわしく みてみましょう。",
      longDesc:
        "ひっき２は かいわを よんで はなしの ながれを すばやく りかいする ことが もっとも だいじな コツに なります。じっさいに もんだいを とおして、かいわの どこに ちゅうもく すれば いいのか、ときかたを かいせつします。",
    },
    {
      day: "13",
      id: "13",
      title: "ひっき３れんしゅうとかいせつ",
      section: "ひっきもんだいのかいせつ",
      shortDesc:
        "ひっき３は ならびかえの もんだいです。くわしく みてみましょう。",
      longDesc:
        "ひっき３は  たんごを ただしい  じゅんばんに ならべて ぶんを つくる もんだいです。ただしい ぶんに いかに なれているか、そして ぶんぽうの きそちしきが とても じゅうような ポイントに なっています。",
    },
    {
      day: "14",
      id: "14",
      title: "ひっき４Aれんしゅうとかいせつ",
      section: "ひっきもんだいのかいせつ",
      shortDesc:
        "ひっき４Aは おしらせを よんで その ないように ついて こたえる もんだいです。",
      longDesc:
        "４きゅうから とうじょうする、「どっかいもんだい」の いちもんめです。こんかいから ながい ぶんしょうを よんで その ないようを りかいしなくては いけません。せいかくに よむだけでなく、はやく よむ ひつようも あるので、テクニックも しょうかいします。",
    },
    {
      day: "15",
      id: "15",
      title: "ひっき４Bれんしゅうとかいせつ",
      section: "ひっきもんだいのかいせつ",
      shortDesc:
        "ひっき４Bは メールを よんで その ないように ついて こたえる もんだいです。",
      longDesc:
        "ひっき４Bは、２つうの メールを よんで その ないように ついて こたえる もんだいです。メールは ふだん あまり めにする きかいは ないかも しれませんが、コツを おさえれば むずかしくは ありません。",
    },
    {
      day: "16",
      id: "16",
      title: "ひっき４Cれんしゅうとかいせつ",
      section: "ひっきもんだいのかいせつ",
      shortDesc:
        "ひっき４Cは せつめいぶんを よんで その ないように ついて こたえる もんだいです。",
      longDesc:
        "せつめいぶんをよむ ひっき４Cは、もっとも ぶんしょうが ながいため にがていしきを もつひとが おおいです。そのぶん、テクニックを しっておくことで まわりの じゅけんしゃに さを つけることが できます。",
    },
    {
      day: "17",
      id: "17",
      title: "ききとり１れんしゅうとかいせつ",
      section: "ききとりもんだいのかいせつ",
      shortDesc:
        "ききとり１は イラストを みながら えいぶんと おうとうを きいて、おうとうを えらぶ もんだいです。",
      longDesc:
        "ききとり１の イラストには こたえは かいてありませんが、かいわを している ふたりの かんけいを よみとく ヒントに なります。じっさいに もんだいを みて ちゅうもくする ポイントや ときかたを みてみましょう。",
    },
    {
      day: "18",
      id: "18",
      title: "Day18",
      section: "ききとりもんだいのかいせつ",
      shortDesc:
        "ききとり２は たいわと しつもんを きいて その こたえを えらぶ もんだいです。くわしく みてみましょう。",
      longDesc:
        "ききとり２には ヒントになる イラストは ありません。じぶんの みみだけが たより ですが、ひっかけとして でてくる ポイントは きまって いるので、その ひっかけポイントに ちゅういしながら じっさいの もんだいを みていきましょう。",
    },
    {
      day: "19",
      id: "19",
      title: "ききとり3れんしゅうとかいせつ",
      section: "ききとりもんだいのかいせつ",
      shortDesc:
        "ききとり２は えいぶんを を きいて その こたえを えらぶ もんだいです。くわしく みてみましょう。",
      longDesc:
        "ききとり３は、ききとり２に にていますが、ききとる ないようが たいわ から えいぶんに かわっています。そのぶん しゅうちゅうりょくが さらに ひつように なるので、おんせいを きくまえに せんたくしを さきよみして みましょう。",
    },
    {
      day: "20",
      id: "20",
      title: "かくにんテストかいせつ",
      section: "かくにんテスト",
      shortDesc:
        "４級の そうふくしゅう！とくに ポイントになる もんだいを くわしく みてみましょう。",
      longDesc:
        "すべての レッスンを とおして まなんだ ことを かくにんテストで じっせん してみましょう。かくにんテストの なかでも とくに むずかしい もんだいを かいせつ します。また、まちがえて しまった もんだいは なぜ まちがえたのかも かならず かくにん しましょう。",
    },
  ],
};

export default videos;
