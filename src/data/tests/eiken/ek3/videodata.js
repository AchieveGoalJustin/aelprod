const videos = {
  test: "英検3級",
  testid: "EK3",
  slug: "/EK3",
  tnslug: "/EK3/EK3TN/EK3TN-",
  videoContent: [
    {
      day: "1",
      id: "1",
      title: "英検３級の攻略法",
      section: "コースの紹介",
      shortDesc:
        "英検®を始めて受ける人がまさに気になる、問題のタイプや求められるスキルについて解説します。",
      longDesc:
        "英検®をまだ受験したことがない人は、勉強を始める前に、まず「英検®ってどんな試験なの？」という疑問を持っているかと思います。そんな皆さんの疑問が解消するされ、より良い勉強のスタートダッシュを決められるように、まずは試験の形式や求められるスキルについて解説します。",
    },
    {
      day: "2",
      id: "2",
      title: "筆記１　解剖レッスン",
      section: "筆記セクション",
      shortDesc:
        "まずは筆記１、どんな問題が出題されるのか、そして攻略法を解説します。",
      longDesc:
        "単語の穴埋め問題という一見単純そうな問題ですが、その一つの問題形式の中にも、求められるスキルが複数あります。それぞれのスキルが求められる問題の割合、対策の仕方と解き方、そしてひっかけポイントを解説します。",
    },
    {
      day: "3",
      id: "3",
      title: "筆記１　単語問題演習",
      section: "筆記セクション",
      shortDesc:
        "筆記１の中でも、単語力が求められる問題を演習・解説・攻略します。",
      longDesc:
        "筆記１は、穴埋め問題の中でも単語力が求められる問題は最も割合が多い問題です。また、スペリングや似た意味など、ひっかけも多く含まれています。問題演習を通し、素早くかつ、ひっかからない解き方を練習しましょう。また、分からない単語は、必ずこのレッスンを通して覚えましょう。",
    },
    {
      day: "4",
      id: "4",
      title: "筆記１　熟語問題演習",
      section: "筆記セクション",
      shortDesc:
        "筆記１の中でも、熟語力が求められる問題を演習・解説・攻略します。",
      longDesc:
        "皆さんが語彙を勉強する時、多くの方は単語のみに注力してしまい、熟語や会話表現はおろそかになってしまいがちです。今回のレッスンでは、熟語の知識が必須になる問題を多く問題演習するので、分からない熟語があったら残さず覚えましょう。",
    },
    {
      day: "5",
      id: "5",
      title: "筆記１　文法問題演習",
      section: "筆記セクション",
      shortDesc:
        "筆記１の中でも、文法力が求められる問題を演習・解説・攻略します。",
      longDesc:
        "文法の知識が求められる問題は、いかに正しい英語の文章に慣れているかが、速く正確に回答するポイントになります。このレッスンでは問題演習を通し、それぞれの問題の正解がなぜ正解で、誤答がなぜ誤答なのかまで解説します。",
    },
    {
      day: "6",
      id: "6",
      title: "筆記２　解剖レッスン",
      section: "筆記セクション",
      shortDesc:
        "続いて筆記２、どんな問題が出題されるのか、そして攻略法を解説します。",
      longDesc:
        "筆記２から、穴埋めの文章が全て会話文になり、選択肢も全て文章や節になります。筆記１と似ているように見えて、気を付けるポイントや解き方、そして求められるスキルが異なるため、そういった点も含め問題演習を通し解説します。",
    },
    {
      day: "7",
      id: "7",
      title: "筆記２　表現問題演習",
      section: "筆記セクション",
      shortDesc:
        "筆記２の中でも、会話表現の知識が求められる問題を演習・解説・攻略します。",
      longDesc:
        "皆さんが語彙を勉強する際、単語と熟語と共に、会話表現を覚えることも同じく重要となります。筆記２や英作文、そして二次面接試験では特に会話表現の知識の重要性が増します。今回は問題演習を通し、頻出の会話表現を習得しましょう",
    },
    {
      day: "8",
      id: "8",
      title: "筆記２　文意問題演習",
      section: "筆記セクション",
      shortDesc:
        "筆記２の中でも、文意の理解力が求められる問題を演習・解説・攻略します。",
      longDesc:
        "筆記２を解く際には、会話表現の知識と併せて文脈を理解する能力も重要となります。多くの方の悩みが文脈を理解するのに時間がかかってしまうことなので、今回の演習を通し素早く理解するコツを身につけ、筆記２だけでなく長文読解にも活かしましょう。",
    },
    {
      day: "9",
      id: "9",
      title: "筆記３　長文読解解剖",
      section: "筆記セクション",
      shortDesc: "筆記３長文読解の詳しい形式の解説、解き方のコツを解説します。",
      longDesc:
        "今回から長文読解問題のレッスンに入っていきます。長文読解問題は最もテクニックが重要となる問題形式なので、全体を通しての解き方のテクニックに加え、タイプ毎の問題の特徴も解説します。このレッスンを見れば、長文読解問題への苦手意識も解消できるはずです。",
    },
    {
      day: "10",
      id: "10",
      title: "筆記３　掲示文問題演習",
      section: "筆記セクション",
      shortDesc:
        "掲示文読解問題の演習・解説を通して、解き方のコツと解答に必要な知識を養います。",
      longDesc:
        "今回は長文読解問題の中で最初に出題される、掲示文問題の演習を行います。「掲示文」という言葉に馴染みがない方も多いかもしれませんので、今回のレッスンではそもそも「掲示文」とは何なのかも併せて例を用いて解説します。",
    },
    {
      day: "11",
      id: "11",
      title: "筆記３　Email問題演習",
      section: "筆記セクション",
      shortDesc:
        "Email読解問題の演習・解説を通して、解き方のコツと解答に必要な知識を養います。",
      longDesc:
        "今回は長文読解問題の中で２つめに出題される、Email問題の演習を行います。そもそも皆さんの日常生活の中でEmailを送ること自体あまり多くないかもしれませんが、どこに注目すれば良いか、などの読み方・テクニックさえわかれば、Email問題にもすぐに慣れることができるはずです。",
    },
    {
      day: "12",
      id: "12",
      title: "筆記３　説明文問題演習",
      section: "筆記セクション",
      shortDesc:
        "説明文読解問題の演習・解説を通して、解き方のコツと解答に必要な知識を養います。",
      longDesc:
        "今回は長文読解問題の中で最後に出題される、説明文問題の演習を行います。今までの長文より文章が長いため苦手意識を持つ方もいますが、解き方のテクニックを理解すれば周りに差をつける得点源にすることができます。",
    },
    {
      day: "13",
      id: "13",
      title: "筆記４　英作文　解剖",
      section: "筆記セクション",
      shortDesc:
        "３級から登場する英作文の書き方やよくある間違いなどを詳しく解説します。",
      longDesc:
        "いよいよ筆記最後の問題形式です。英作文は３級から新たに登場するため、英語で文章を書くことが初めてという方もいるかもしれません。今回は、英語上級者でもよくしてしまう簡単な間違いを解説するので、それらを理解して自分の英作文を自分で添削できるようになりましょう。",
    },
    {
      day: "14",
      id: "14",
      title: "筆記４　英作文　パターン解説",
      section: "筆記セクション",
      shortDesc:
        "３級の英作文にはパターンがあり、それを知っていると周りに大きな差を付けられます。",
      longDesc:
        "３級の英作文には特に時間がかかってしまう方も多くいるかもしれませんが、パターンとフレーズさえ理解してしまえば素早く解くことができます。また今回のレッスンでは間違いを直す練習も行います。スピードと正確さ、両方を同時に鍛えましょう。",
    },
    {
      day: "15",
      id: "15",
      title: "リスニング勉強法解説",
      section: "リスニングセクション",
      shortDesc:
        "リスニングスキルを普段使うことが少なくても、リスニングが得意になる勉強法を紹介します。",
      longDesc:
        "今回のレッスンまでは筆記、つまりリーディングとライティングについて学習してきました。リスニングからは、また違った勉強法やスキルが求められます。それらの項目を、講師陣が実際に行った勉強法などを元に解説します。",
      listening: {
        復習: [
          { id: 1, slug: "FS" },
          { id: 2, slug: "FS" },
          { id: 3, slug: "FS" },
          { id: 4, slug: "FS" },
          { id: 5, slug: "FS" },
          { id: 6, slug: "FS" },
          { id: 7, slug: "FS" },
          { id: 8, slug: "FS" },
          { id: 9, slug: "FS" },
          { id: 10, slug: "FS" },
        ],
      },
    },
    {
      day: "16",
      id: "16",
      title: "リスニング　解剖",
      section: "リスニングセクション",
      shortDesc:
        "３級のリスニングセクションは３部構成になっています。それぞれの形式を詳しく解説します。",
      longDesc:
        "３級のリスニング試験は、３部構成になっています。それぞれの部によって問題形式や解き方、気をつけるポイントが違うので、一つ一つ例題を用いて解説します。このレッスンの内容を踏まえて次回以降の予習問題を解くことで、効果的な解き方を実践してみましょう。",
      listening: {
        復習: [
          { id: 1, slug: "FS" },
          { id: 2, slug: "FS" },
          { id: 3, slug: "FS" },
          { id: 4, slug: "FS" },
          { id: 5, slug: "FS" },
          { id: 6, slug: "FS" },
          { id: 7, slug: "FS" },
          { id: 8, slug: "FS" },
          { id: 9, slug: "FS" },
          { id: 10, slug: "FS" },
        ],
      },
    },
    {
      day: "17",
      id: "17",
      title: "リスニング第１部　演習",
      section: "リスニングセクション",
      shortDesc:
        "リスニング第１部：イラスト問題の演習・解説を通し、詳しい解き方の流れを習得します。",
      longDesc:
        "今回は全部で３部あるリスニング試験の中で最初に出題される、イラスト問題を演習していきます。選択肢の数や気をつけるポイントが他の部と大きく異なるので、演習を通し効果的な解き方を定着させましょう。Ayaka先生特製のイラストにも注目です！",
      listening: {
        予習: [
          { id: 1, slug: "YS" },
          { id: 2, slug: "YS" },
          { id: 3, slug: "YS" },
          { id: 4, slug: "YS" },
          { id: 5, slug: "YS" },
        ],
        復習: [
          { id: 1, slug: "FS" },
          { id: 2, slug: "FS" },
          { id: 3, slug: "FS" },
          { id: 4, slug: "FS" },
          { id: 5, slug: "FS" },
        ],
      },
    },
    {
      day: "18",
      id: "18",
      title: "リスニング第２部　演習",
      section: "リスニングセクション",
      shortDesc:
        "リスニング第２部：会話問題の演習・解説を通し、詳しい解き方の流れを習得します。",
      longDesc:
        "今回のレッスンはリスニング第２部、会話問題を演習します。第２部からはヒントとなるイラストがないので難しいと感じる方も多いかもしれませんが、問題の流れや質問されがちなポイントなどを把握すれば、決して難しくありません。問題形式を完全に理解し、攻略しましょう。",
      listening: {
        予習: [
          { id: 1, slug: "YS" },
          { id: 2, slug: "YS" },
          { id: 3, slug: "YS" },
          { id: 4, slug: "YS" },
          { id: 5, slug: "YS" },
        ],
        復習: [
          { id: 1, slug: "FS" },
          { id: 2, slug: "FS" },
          { id: 3, slug: "FS" },
          { id: 4, slug: "FS" },
          { id: 5, slug: "FS" },
        ],
      },
    },

    {
      day: "19",
      id: "19",
      title: "リスニング第３部　演習",
      section: "リスニングセクション",
      shortDesc:
        "リスニング第３部：スピーチ問題の演習・解説を通し、詳しい解き方の流れを習得します。",
      longDesc:
        "今回のレッスンはリスニング第３部、スピーチ問題を演習します。第２部と違い話者が一人で、かつ一次試験の一番最後の問題なので、ここで集中力が切れてしまう方も多いかと思います。問題形式を完全に理解し、攻略しましょう。",
      listening: {
        予習: [
          { id: 1, slug: "YS" },
          { id: 2, slug: "YS" },
          { id: 3, slug: "YS" },
          { id: 4, slug: "YS" },
          { id: 5, slug: "YS" },
        ],
        復習: [
          { id: 1, slug: "FS" },
          { id: 2, slug: "FS" },
          { id: 3, slug: "FS" },
          { id: 4, slug: "FS" },
          { id: 5, slug: "FS" },
        ],
      },
    },
    {
      day: "20",
      id: "20",
      title: "二次面接試験の解剖",
      section: "二次面接試験対策",
      shortDesc:
        "３級から追加になる二次面接試験の流れや必要なフレーズ、そして緊張しないコツを紹介します。",
      longDesc:
        "３級から、二次試験として面接の試験が追加となります。４技能（リーディング・ライティング・リスニング・スピーキング）の中で、スピーキングの能力は最も使う機会が少なく、緊張してしまう方も多いかもしれません。このレッスンでは試験の流れを詳しく解説するので、まずは試験の流れを攻略しましょう。",
    },
    {
      day: "21",
      id: "21",
      title: "二次面接試験　passage対策",
      section: "二次面接試験対策",
      shortDesc:
        "passageの黙読、音読、そしてpassage内容の質問は最初の関門です。しっかりとテクニックを紹介します。",
      longDesc:
        "二次面接試験ではまず始めに、passage（文章）を黙読・音読し、その内容についての質問に答えます。質問に気をとられて音読がおろそかになってしまう方も見受けられるので、このレッスンでは音読をする際に気を付けるポイントも詳しく解説します。",
    },
    {
      day: "22",
      id: "22",
      title: "二次面接試験　picture対策",
      section: "二次面接試験対策",
      shortDesc:
        "会話描写をする際は、使うフレーズや時制などにルールがあります。内容に集中するために、形式をおさえましょう。",
      longDesc:
        "passage（文章）を黙読・音読を終えると、続いてpicture（イラスト）の内容に関する質問が２問出題されます。ここからは自分で文章を考え発言しなくてはいけません。その際に気を付ける解答の仕方、発音のポイントなどを解説します。",
    },
    {
      day: "23",
      id: "23",
      title: "二次面接試験　自由質問対策",
      section: "二次面接試験対策",
      shortDesc:
        "英検を始めて受ける人がまさに気になる、問題のタイプや求められるスキルについて解説します。",
      longDesc:
        "英検をまだ受験したことがない人は、勉強を始める前に、まず「英検ってどんな試験なの？」という疑問を持っているかと思います。そんな皆さんの疑問が解消するされ良い勉強のスタートダッシュを決められるように、まずは試験の形式や求められるスキルについて解説します。",
    },
    {
      day: "24",
      id: "24",
      title: "３級　総まとめ",
      section: "コースまとめ",
      shortDesc:
        "全２４回の総復習をします。前半のレッスンも忘れていないか、一緒に確認しましょう。",
      longDesc:
        "Day１からDay２４までを通し、全問題形式の対策を行いました。理解しなければならないポイントが多くありましたが、今回のレッスンではそれらの重要なポイントを総復習します。もし不安なポイントがあれば、そのポイントが登場したDayをもう一度受講しましょう。",
    },
  ],
};

export default videos;