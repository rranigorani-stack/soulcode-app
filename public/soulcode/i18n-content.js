/* 소울코드 콘텐츠 번역 (2단계-1): 오행·일간·MBTI·관계·타로 22장
 * app.js의 데이터 배열을 언어에 맞게 바꿔요. 한국어면 아무것도 안 해요. */
window.SOUL_CONTENT = {
  en: {
    EL: [
      { name: 'Wood', colorName: 'green', excess: 'So many things you want to do that you start everything and finish nothing.', lack: 'Walks, growing plants, starting a new routine', items: ['Plant keyring', 'Green tumbler', 'Mint gum'] },
      { name: 'Fire', colorName: 'red', excess: 'When your energy overheats, words come out before thoughts. Watch the outbursts!', lack: 'Sunlight, seeing people you love, working out', items: ['Red lip balm', 'Scented candle', 'Hand warmer'] },
      { name: 'Earth', colorName: 'yellow', excess: 'Overthinking slows your decisions and makes you stubborn.', lack: 'Regular meals, planning your week in a diary', items: ['Knit accessory', 'Ceramic mug', 'Honey stick'] },
      { name: 'Metal', colorName: 'silver', excess: 'Your standards are so high your words can cut like a blade.', lack: 'Tidying your room, setting deadlines, saying a clear no', items: ['Silver ring', 'Wireless earbuds', 'Coin purse'] },
      { name: 'Water', colorName: 'blue', excess: 'Thoughts chase thoughts until 3 a.m. overthinking takes over.', lack: 'Drinking more water, alone time, journaling', items: ['Bottle of water', 'Blue pen', 'Bath bomb'] },
    ],
    STEM_INFO: [
      { img: 'A tall, straight tree', desc: 'Once you set a goal you grow it to the end. You see the big picture from a head above everyone.', tags: ['#GrowthMode', '#BornLeader', '#QuietlyStubborn'] },
      { img: 'A flower that blooms anywhere', desc: 'You adapt fast and naturally connect people. Soft on the outside, unbreakable inside.', tags: ['#AdaptsToAnything', '#SocialButterfly', '#SoftButStrong'] },
      { img: 'The midday sun', desc: 'Your presence alone lights up the room. Honest and bold, you hide nothing.', tags: ['#HumanVitamin', '#NoFilter', '#MainCharacter'] },
      { img: 'A candle in the night', desc: 'You focus on one thing for a long time. To the people close to you, you are the warmest.', tags: ['#Detailed', '#DeepFocus', '#QuietWarmth'] },
      { img: 'A great mountain', desc: 'Steady and hard to shake. The first person friends call when something goes wrong.', tags: ['#Reliable', '#BigHeart', '#Solid'] },
      { img: 'A garden that grows everything', desc: 'Practical and smart about what matters. You grow people and projects step by step.', tags: ['#Practical', '#Caring', '#RealityCheck'] },
      { img: 'Solid steel', desc: 'Fast decisions, clean action. Once you are on someone’s side, you are loyal for life.', tags: ['#Decisive', '#Loyal', '#Unstoppable'] },
      { img: 'A shining jewel', desc: 'A perfectionist with an eye for detail. You know how to polish yourself until you sparkle.', tags: ['#GoodTaste', '#Perfectionist', '#SelfLove'] },
      { img: 'An endless ocean', desc: 'Big-scale, free-thinking. You have the wisdom and openness to flow anywhere.', tags: ['#FreeSpirit', '#BigPicture', '#OldSoul'] },
      { img: 'A soft spring rain', desc: 'You read the room without words. You quietly sink into people’s hearts.', tags: ['#Intuitive', '#EmpathyFairy', '#Sensitive'] },
    ],
    MBTI: {
      INTJ: { nick: 'The Architect Brain', desc: 'already has a 5-year plan in their head' }, INTP: { nick: 'Curiosity Lab Director', desc: 'digs into anything they are curious about' },
      ENTJ: { nick: 'The Game Changer', desc: 'moves people and plans the moment a goal appears' }, ENTP: { nick: 'Runaway Idea Train', desc: 'gets energy from debates and new experiments' },
      INFJ: { nick: 'The Quiet Prophet', desc: 'sees right through people’s hearts' }, INFP: { nick: 'Dreamy Idealist', desc: 'has a clear world and values of their own' },
      ENFJ: { nick: 'Everyone’s Mentor', desc: 'helps the people around them grow' }, ENFP: { nick: 'Sparkling Explorer', desc: 'gets excited by new people and ideas' },
      ISTJ: { nick: 'Trusted Rule Keeper', desc: 'always finishes what they take on' }, ISFJ: { nick: 'Gentle Guardian', desc: 'quietly takes care of the people they love' },
      ESTJ: { nick: 'The Efficient Manager', desc: 'keeps things running with systems and speed' }, ESFJ: { nick: 'The Mood Maker', desc: 'warms the room so everyone feels comfortable' },
      ISTP: { nick: 'The Cool Fixer', desc: 'moves their hands before their mouth' }, ISFP: { nick: 'The Soft Artist', desc: 'has clear taste and a strong sense of style' },
      ESTP: { nick: 'The Straight-Line Adventurer', desc: 'tries first and thinks later' }, ESFP: { nick: 'Born Stage Star', desc: 'enjoys the moment more than anyone' },
    },
    SYNERGY: {
      yangE: 'Your energy and personality both reach outward. A natural main character on any stage!',
      yangI: 'Calm outside, huge energy inside. Once the stage is set, nobody is stronger.',
      yinE: 'You draw people in softly. People gather around you without you even trying.',
      yinI: 'Deep and quiet inner strength. The longer people know you, the more they see your worth.',
    },
    RELATION: [
      { name: 'Teammate Day', desc: 'Energy just like yours comes in. Great synergy with friends and coworkers, but avoid stubborn battles.' },
      { name: 'Expression Day', desc: 'Your energy flows outward. Talking, creating and posting are all good today.' },
      { name: 'Results Day', desc: 'Energy you can control comes in. A good day for money, results and practical wins.' },
      { name: 'Responsibility Day', desc: 'Energy that shapes you comes in. Keep your promises and you will be recognized. Might feel a bit tiring.' },
      { name: 'Recharge Day', desc: 'Supporting energy comes in. Perfect for studying, resting and listening to advice.' },
    ],
    TG_THEME: {
      비겁: { name: 'Allies & Rivals', d: 'Your bonds with friends and coworkers grow stronger. Great synergy together, just ease off comparing and competing!', love: 'A comfy, friend-like connection comes in. Hello, friend-of-a-friend setup', work: 'You shine in team projects', money: 'Money leaks easily. Split the bill 💸', body: 'Overflowing energy. Great time to start working out' },
      식상: { name: 'Expression & Creation', d: 'A great flow for talking, making and showing. Your charm spills outward.', love: 'Charm season! Make the first move and it lands', work: 'Strong at ideas, presentations and content', money: 'Your talent can turn into money. Jot down side-hustle ideas', body: 'Talking a lot? Take care of your throat 🗣️' },
      재성: { name: 'Results & Rewards', d: 'Your effort turns into results you can hold. Your practical sense shines.', love: 'Lots of exciting meetups and dates', work: 'Results and grades become visible', money: 'Money moves fast! It goes out as fast as it comes in, so track it', body: 'Busy enough to skip meals. Watch out' },
      관성: { name: 'Duty & Recognition', d: 'More to do, but pull it off and you\'ll be clearly recognized.', love: 'Good for getting serious. Watch the push-and-pull fatigue', work: 'Luck with exams, reviews and promotions. Just hit your deadlines', money: 'Stable, but hold off on big spending', body: 'Watch stress fatigue and get your sleep' },
      인성: { name: 'Learning & Recharge', d: 'Study, rest and advice sink in well. Depth beats speed.', love: 'You\'re drawn to people who understand you', work: 'Perfect for certificates, study and planning', money: 'Easier to save than spend', body: 'Top recovery mode. A good rest fixes everything' },
    },
    TTI_YEAR: { yukhap: 'This year\'s energy holds hands with your sign! Helpers and chances come your way.', samhap: 'Same-team energy. Luck opens up in groups and collabs.', same: 'It\'s your own sign\'s year. You stand out more, but overdoing it tires you fast.', none: 'A smooth flow. Go at your own pace.', hae: 'Small misunderstandings pop up easily. Mind your words a little more.', wonjin: 'Hurt feelings come up for no reason. Try a routine to clear your mind.', chung: 'A year of change and movement. Big shifts like moving, transferring or a new job are likely.' },
    SKINS: ['Hologram', 'Starry Night', 'Strawberry Milk', 'Y2K Chrome', 'Matcha Latte'],
    BR_REL: {
      yukhap: ['Six Harmony', 'Your spouse palaces form a Six Harmony! A magnet couple that pulls each other in.'],
      samhap: ['Triple Harmony', 'Your spouse palaces form a Triple Harmony. A team couple walking in the same direction.'],
      same: ['Same sign', 'Same character in your spouse palaces. Your routines sync up, but being too alike may cool the butterflies.'],
      none: ['Peace mode', 'No big clashes or pulls. You two build the chemistry together.'],
      hae: ['Harm', 'Small hurt feelings can pile up. Talk things out as they come and you\'re fine.'],
      wonjin: ['Love-hate', 'Upset for no reason yet somehow can\'t let go… love-hate chemistry alert! Accepting your differences is key.'],
      chung: ['Clash', 'Sparks fly when you collide. But it\'s also an intense bond that can change you both.'],
    },
    TEN_INFO: {
      비견: 'A partner who feels like a friend. Easy and equal, but you have to create the butterflies yourselves.',
      겁재: 'A stimulating rival type. Together, your competitive side turns ON 🔥',
      식신: 'Someone you keep wanting to take care of. You want to feed them good food 🍰',
      상관: 'Playful banter buddy. Even arguments feel like a date 😝',
      편재: 'The thrill-maker. Free, event-like romance 🎢',
      정재: 'A realistic, stable match. Built to last 🏡',
      편관: 'Someone you\'re intensely drawn to. Attraction MAX, but watch the push-and-pull fatigue ⚡',
      정관: 'Reliable and upright. A partner you want to show off 🎖️',
      편인: 'Someone who gets your unique side. Conversations go deep 🔭',
      정인: 'Always on your side. Being together puts your mind at ease 🫶',
    },
    PAIRS: [['Extravert', 'Recharges with people', 'Introvert', 'Recharges alone'], ['Sensing', 'Real-world, experience', 'Intuition', 'Imagination, possibilities'], ['Thinking', 'Facts matter', 'Feeling', 'Feelings matter'], ['Judging', 'Likes plans', 'Perceiving', 'Likes going with the flow']],
    SP_CATS: ['Love', 'Career·Study', 'Relationships', 'Money'],
    SP_POS: ['Past', 'Present', 'Future'],
    VERDICT: {
      go: { t: 'GO signal 🟢', d: 'The flow is on your side. If you\'ve been hesitating, now is a good time to move.' },
      wait: { t: 'Hold on 🟡', d: 'Right direction, but watch the timing a bit more. The more you prepare, the better.' },
      turn: { t: 'Change course 🔴', d: 'Keeping the same approach may take a lot out of you. Try a different angle.' },
    },
    SP_ACTION: {
      love: { go: 'Be brave and message first. Keep it short and light!', wait: 'Focus on your own day instead of reply times', turn: 'First figure out what you really want from this relationship' },
      career: { go: 'Send that application or start that challenge this week', wait: 'Gather more info. Ask a senior or someone in the field', turn: 'Lower the goal one step and restart small' },
      people: { go: 'Reach out first to someone you\'re grateful for', wait: 'If there\'s a misunderstanding, talk after emotions cool down', turn: 'Take some distance from relationships that drain you' },
      money: { go: 'Go ahead with planned buys or savings, within budget', wait: 'Delay big spending 2 weeks and track your expenses', turn: 'Start by cancelling subscriptions. Plug the leaks!' },
    },
    MT_REL: ['Crush·Partner PRO', 'Friend', 'Coworker'],
    SAJU_MATCH: [
      { t: 'Mirror match', d: 'Same element, so you understand each other without words. But when you both get stubborn, nobody backs down.' },
      { t: 'I take care of them', d: 'Your energy helps them grow. Caring feels good, just don\'t burn out from only giving.' },
      { t: 'I lead', d: 'Your energy steers theirs, so the lead naturally comes to you. Asking their opinion first boosts the chemistry.' },
      { t: 'They shape me', d: 'They train and refine you. It may feel like nagging, but they help you grow.' },
      { t: 'They fill me up', d: 'Their energy boosts yours. Being together feels comfy and recharging!' },
    ],
    MT_TIP: {
      lover: ['Your differences can be your charm. Try talking in their MBTI style once 💬', 'Great chemistry! Text first and the odds are good 💌'],
      friend: ['Different tastes, but you can show each other new worlds 🌏', 'Friends for life. Take a trip together ✈️'],
      work: ['Your work styles differ. Agree on roles and deadlines early 📋', 'Amazing synergy on projects. Just split roles clearly! 🚀'],
    },
    SCORE_CATS: ['Love', 'Work·Study', 'Money', 'Energy'],
    STAMPS_UP: ['LUCKY! 🍀', 'Even better 👍', 'Let’s go 🔥', 'So lucky ✨', 'WOW!', 'Energy is wild ⚡'],
    STAMPS_REV: ['It’s okay 🫶', 'Plot twist ahead 🙃', 'Take a breath 🫧', 'Resting is OK ☁️'],
    TAROT: [
      ['The Fool', 'New start · Freedom', 'Reckless · Unprepared', 'Perfect timing for a new start. Doing it now beats a perfect plan.', 'Go with that excited feeling. Today you are braver than you think ✨', 'Impulsive decisions could cost you. Wait 10 seconds before you pay.', 'It’s okay to be in a rush. Taking a breath won’t make you late.'],
      ['The Magician', 'Skill · Action', 'Showing off · Tricks', 'You already have every ingredient you need. Whatever you start today turns out well.', 'You already have enough power. Believe in yourself 🔮', 'Talk without action loses trust. Only promise what you can show.', 'You don’t have to try so hard to impress. You are best as you are.'],
      ['The High Priestess', 'Intuition · Secrets', 'Confusion · Hiding', 'Not all the info is out yet. Hold your decision and observe.', 'That small voice inside is probably right. Trust your gut 🌙', 'Feelings and facts are mixing. Sort out the facts first.', 'Don’t carry it alone. It’s okay to tell someone you trust.'],
      ['The Empress', 'Abundance · Charm', 'Excess · Dependence', 'What you invest comes back today. Money spent on you and your space is worth it.', 'You are glowing today. Spend the day taking care of yourself 🌸', 'Watch overspending and overeating. Keep the retail therapy in your cart.', 'Did you forget yourself while caring for others? Today, you come first.'],
      ['The Emperor', 'Leadership · Order', 'Stubborn · Control', 'Take the lead and things unlock. Make schedules and roles clear.', 'When you hold the center, everyone feels safe 👑', 'Insisting on your way creates conflict. Listen to one other method.', 'You don’t have to carry everything alone. Relax your shoulders.'],
      ['The Hierophant', 'Advice · Learning', 'Fixed ideas · Rebellion', 'Proven methods are fastest today. Ask a senior or expert for advice.', 'One word from someone you trust will mean a lot.', 'What works for everyone may not work for you. Recheck your standards.', 'You don’t have to follow the set path. Your own way is right too.'],
      ['The Lovers', 'Love · Choice', 'Conflict · Hesitation', 'A day of big choices. Write a pros and cons list and the answer appears.', 'The side your heart leans to is probably right 💞 Butterfly alert!', 'Unspoken frustration is piling up. Clear up misunderstandings fast.', 'A wavering heart is natural. Take your time to look at what you really feel.'],
      ['The Chariot', 'Breakthrough · Victory', 'Out of control · Lost', 'Push and you win today. Pick one goal and go straight.', 'Keep that momentum! Don’t stop today 🏁', 'Direction over speed. Check you are on the right road first.', 'If you are exhausted from running, it’s okay to stop for a bit.'],
      ['Strength', 'Courage · Patience', 'Low confidence · Sensitive', 'Gentle persuasion wins. Emotional control is your weapon today.', 'You are stronger than you think. You are doing great 🦁', 'Tiredness makes you sensitive. Save big talks for when you feel good.', 'Everyone has weak days. Don’t push yourself too hard.'],
      ['The Hermit', 'Reflection · Alone time', 'Isolation · Loneliness', 'Focus alone for peak efficiency. Turn off notifications and go deep.', 'Recharging in your own cave today is okay 🏮 You need it.', 'Hide too much and you miss chances. Reach out to one person first.', 'If you feel lonely, don’t hide it. Lean on someone.'],
      ['Wheel of Fortune', 'Turning point · Luck', 'Bad timing', 'The flow is changing. Grab the opportunity that comes in.', 'Good things are coming back around to you 🍀', 'The timing is a little off today. Delay big decisions a few days.', 'Bad days pass too. Your turn is coming soon.'],
      ['Justice', 'Fairness · Decision', 'Unfair · Biased', 'Judge objectively and you won’t lose. Read contracts and documents carefully.', 'Your effort will come back to you honestly ⚖️', 'Don’t judge after hearing only one side. Keep evidence for unfair situations.', 'Are you being too strict with yourself?'],
      ['The Hanged Man', 'New perspective · Waiting', 'Stuck · Sacrifice', 'Waiting is the strategy right now. Look from another angle and you’ll see it.', 'Even when it feels like you’re stuck, you are growing 🌱', 'Stop waiting for nothing. Let go of what needs letting go.', 'Don’t just hold it in for others. Say how you feel too.'],
      ['Death', 'Endings & new starts', 'Resisting change', 'End what needs ending so something new can start. Do that clean-up today.', 'It looks scary but it’s a butterfly card 🦋 Change is growth.', 'Clinging to the familiar keeps you in place. Start with a small change.', 'Letting go is hard, I get it. Take it slow.'],
      ['Temperance', 'Balance · Harmony', 'Imbalance · Too much', 'Moderation wins. Just adjusting work and rest boosts your efficiency.', 'A calm day for your heart. Keep your own pace 🧘', 'You are leaning too far one way. Check your sleep and meals first.', 'You are trying so hard. It’s okay to loosen up a little.'],
      ['The Devil', 'Temptation · Obsession', 'Release · Breaking free', 'Dopamine temptation alert. Resist just one: short videos, late-night snacks or impulse buys.', 'Being drawn to things is natural, but you can let go of what hurts you.', 'A great day to break a bad habit. Decide now and you’ll likely succeed.', 'You are finally breaking free from something that held you 🔓'],
      ['The Tower', 'Sudden change · Revelation', 'Crisis avoided', 'Unexpected things may happen. Prepare a plan B.', 'You may shake but you won’t fall. You’ll come out stronger ⚡', 'You dodged the crisis but the root cause remains. Check it.', 'That was close, but you’re okay. Calm your startled heart first.'],
      ['The Star', 'Hope · Inspiration', 'Disappointment · Low confidence', 'Great day for long-term goals. Turn your wishlist into a real plan.', 'Your dreams are coming true, sparkle by sparkle ⭐ Keep believing.', 'Expectations too high lead to big letdowns. Break goals into small steps.', 'Even when you can’t see the light, the star is still there. So are you.'],
      ['The Moon', 'Anxiety · Subconscious', 'Clarity returns', 'Lots of unclear info today. Filter out unconfirmed rumors.', 'You might feel uneasy for no reason. That feeling isn’t real 🌕', 'A blurry situation becomes clear. The truth comes out.', 'You’ll find the thing you worried about was no big deal.'],
      ['The Sun', 'Success · Joy', 'Briefly cloudy', 'Peak luck. Finish what you’ve been putting off and it goes well.', 'Total lucky day ☀️ Laugh and enjoy as much as you want!', 'Good flow, but no overconfidence. Double-check the details.', 'It’s only a passing cloud. Your sunshine is still there.'],
      ['Judgement', 'Rebirth · Decision', 'Regret · Self-criticism', 'Past effort gets recognized. A good time to try again.', 'It’s okay to start over. You’ll do even better this time 📯', 'Stop replaying old mistakes. Keep the lesson and move on.', 'Don’t push yourself so hard. You’ve done enough.'],
      ['The World', 'Completion · Achievement', 'Unfinished', 'A cycle completes. Wrap up your results and prepare for the next level.', 'Look how far you’ve come 🌍 Give yourself some praise.', 'The end is in sight but the finish is weak. Focus on the last 10%.', 'Just a little further. You’re almost there!'],
    ],
  },
  ja: {
    EL: [
      { name: '木', colorName: 'グリーン', excess: 'やりたいことが多すぎて、始めるだけで終わらないことも。', lack: '散歩、植物を育てる、新しい習慣を始める', items: ['植物のキーホルダー', 'グリーンのタンブラー', 'ミントガム'] },
      { name: '火', colorName: 'レッド', excess: 'テンションが上がりすぎると言葉が先に出ちゃう。暴走注意!', lack: '日光浴、好きな人に会う、運動', items: ['赤いリップクリーム', 'アロマキャンドル', 'カイロ'] },
      { name: '土', colorName: 'イエロー', excess: '考えすぎて決断が遅くなり、頑固になりがち。', lack: '規則正しい食事、手帳で予定を整理', items: ['ニット小物', '陶器のマグ', 'はちみつスティック'] },
      { name: '金', colorName: 'シルバー', excess: '基準が高すぎて、言葉が刃物みたいに鋭くなることも。', lack: '部屋の片づけ、締め切りを決める、はっきり断る', items: ['シルバーリング', 'ワイヤレスイヤホン', '小銭入れ'] },
      { name: '水', colorName: 'ブルー', excess: '考えが考えを呼んで、深夜の妄想が止まらない。', lack: 'こまめに水を飲む、ひとり時間、日記を書く', items: ['ミネラルウォーター', '青いボールペン', '入浴剤'] },
    ],
    STEM_INFO: [
      { img: 'まっすぐ伸びる大樹', desc: '一度決めた目標は最後まで育てる成長型。人より一段上から大きな絵を見ています。', tags: ['#成長キャラ', '#リーダー気質', '#じつは頑固'] },
      { img: 'どこでも咲く花', desc: '環境が変わってもすぐ適応して、人と人を自然につなぐ。やわらかいけど生命力は最強。', tags: ['#適応力MAX', '#社交の天才', '#外柔内剛'] },
      { img: '真昼の太陽', desc: 'いるだけで場が明るくなる存在感。正直で熱くて、隠し事ができない。', tags: ['#人間ビタミン', '#裏表なし', '#存在感'] },
      { img: '夜を照らすろうそく', desc: 'ひとつのことを長く照らす集中力。身近な人には誰よりもあたたかい。', tags: ['#繊細', '#没頭タイプ', '#ほのかな温もり'] },
      { img: '頼れる大きな山', desc: '簡単には揺るがないどっしり感。友達が困ったとき真っ先に頼る人。', tags: ['#頼れる', '#包容力', '#どっしり'] },
      { img: 'すべてを育てる庭', desc: '現実感覚がよく、実をとるのが上手。人も仕事も少しずつ育てるタイプ。', tags: ['#実利派', '#気配り上手', '#現実派'] },
      { img: '硬い鋼', desc: '決断は速く、行動はスパッと。一度仲間になったら義理堅さは本物。', tags: ['#決断力', '#義理堅い', '#推進力'] },
      { img: '輝く宝石', desc: 'センスとこだわりが光る完璧主義。自分をキラキラに磨くのが上手。', tags: ['#センス◎', '#完璧主義', '#自己肯定感'] },
      { img: '果てしない海', desc: 'スケールが大きく、考え方が自由。どこへでも流れていける知恵と包容力がある。', tags: ['#自由人', '#視野が広い', '#賢者'] },
      { img: 'しっとり春の雨', desc: '言わなくても空気を読む直感力。静かにしみこんで人の心をうるおす。', tags: ['#直感力', '#共感の妖精', '#感受性'] },
    ],
    MBTI: {
      INTJ: { nick: '設計するブレイン', desc: '頭の中にもう5年分の計画がある' }, INTP: { nick: '好奇心研究所の所長', desc: '気になることはとことん掘り下げる' },
      ENTJ: { nick: '盤面を動かすリーダー', desc: '目標ができると人も計画も動かす' }, ENTP: { nick: 'アイデア暴走機関車', desc: '議論と新しい挑戦でエネルギーを得る' },
      INFJ: { nick: '静かな予言者', desc: '人の本音を見抜く' }, INFP: { nick: 'ふわふわ理想主義者', desc: '自分だけの世界観と価値観がはっきりしている' },
      ENFJ: { nick: 'みんなのメンター', desc: 'まわりの人を成長させる' }, ENFP: { nick: 'キラキラ探検家', desc: '新しい人とアイデアにときめく' },
      ISTJ: { nick: '信頼の原則派', desc: '引き受けたことは確実にやり遂げる' }, ISFJ: { nick: 'やさしい守護者', desc: '大切な人を黙々と守る' },
      ESTJ: { nick: '仕事できるマネージャー', desc: '効率と仕組みで物事を回す' }, ESFJ: { nick: 'ムードメーカー', desc: 'みんなが居心地よくなるよう空気をあたためる' },
      ISTP: { nick: 'クールな解決屋', desc: '口より先に手が動く' }, ISFP: { nick: '感性のアーティスト', desc: '好みとセンスがはっきりしている' },
      ESTP: { nick: 'まっすぐ冒険家', desc: 'まずやってから考える' }, ESFP: { nick: '生まれつきのスター', desc: '今この瞬間を誰よりも楽しむ' },
    },
    SYNERGY: {
      yangE: '気も性格も外へ向かうタイプ。どこでも主役になれる舞台向き!',
      yangI: '外は落ち着いているのに中はエネルギー満タンのギャップ型。舞台が整えば誰より強い。',
      yinE: 'やわらかく人を引き寄せる自然体の人気者。頑張らなくても人が集まる。',
      yinI: '深く静かな実力派。長く付き合うほど本当の良さが見えてくる人。',
    },
    RELATION: [
      { name: '味方デー', desc: '自分と同じ気が入る日。友達や同僚と組むと相乗効果、ただし意地の張り合いは注意。' },
      { name: '表現デー', desc: '自分の気が外へ流れる日。話す・作る・SNS投稿、ぜんぶ◎。' },
      { name: '成果デー', desc: '自分が扱う気が入る日。お金・結果・実利をつかむのにいい日。' },
      { name: '責任デー', desc: '自分を磨く気が入る日。約束を守ると認められる。少し疲れやすいかも。' },
      { name: '充電デー', desc: '自分を助ける気が入る日。勉強・休息・アドバイスを聞くのに最適。' },
    ],
    TG_THEME: {
      비겁: { name: '味方&ライバル', d: '友達や同僚とのつながりが強まる。一緒にやると相乗効果、ただ比較と競争心はちょっと手放して!', love: '友達みたいな気楽な縁が来そう。知り合いの紹介に期待', work: 'チーム作業・協力で存在感UP', money: 'お金が漏れやすい。割り勘必須 💸', body: 'エネルギーあふれる。運動を始めるのにいい時期' },
      식상: { name: '表現&創作', d: '話す・作る・見せるのにいい流れ。あなたの魅力が外へあふれ出る。', love: '魅力発揮シーズン!先に近づくと反応◎', work: 'アイデア・発表・コンテンツに強い', money: '才能がお金になる流れ。副業アイデアをメモ', body: 'おしゃべりが増えるぶん喉のケアを 🗣️' },
      재성: { name: '成果&実り', d: '頑張った分だけ結果が手に入る。現実感覚が光る時期。', love: 'ときめく出会いやデートイベントが多め', work: '成果や成績が目に見える', money: 'お金の流れが活発!入る分出ていくので記録必須', body: '忙しくて食事を抜きがち。注意' },
      관성: { name: '責任&評価', d: 'やることは増えるけど、やり遂げれば確実に認められる。', love: '真剣な関係に発展しやすい。でも駆け引き疲れに注意', work: '合格・評価・昇進運。締め切りさえ守ればOK', money: '安定しているけど大きな出費は保留', body: 'ストレス疲れに注意、睡眠をしっかり' },
      인성: { name: '学び&充電', d: '勉強・休息・アドバイスがよく入る時期。スピードより深さが勝つ。', love: '自分をわかってくれる人に心が向く', work: '資格・勉強・企画に最適', money: '使うより貯めやすい時期', body: '回復力最高。ゆっくり休めば全部回復' },
    },
    TTI_YEAR: { yukhap: '今年の気とあなたの干支が手を取る年!助けてくれる人とチャンスが来やすい。', samhap: '同じチームの気。集まりや協力で運が開ける。', same: 'あなたの干支の年。存在感は大きくなるけど、無理すると疲れやすい。', none: 'おだやかな流れ。自分のペースでいけばOK。', hae: '小さな誤解が生まれやすい。ひとこと気をつけて。', wonjin: 'なんとなく寂しくなることが起きやすい。心を整える習慣がおすすめ。', chung: '変化と移動の多い年。引っ越し・転校・転職など大きな変化が来やすい。' },
    SKINS: ['ホログラム', '星空', 'いちごミルク', 'Y2Kクローム', '抹茶ラテ'],
    BR_REL: {
      yukhap: ['六合', '配偶者の座どうしが六合!お互い引き寄せ合う磁石カップル。'],
      samhap: ['三合', '配偶者の座が三合。同じ方向を見て歩くチームカップル。'],
      same: ['同じ字', '配偶者の座が同じ字。生活リズムのシンクロ率は高いけど、似すぎてときめきが減るかも。'],
      none: ['平和モード', '特にぶつかりも引き合いもしない仲。相性はふたりで作っていくタイプ。'],
      hae: ['害', '小さな寂しさがたまりやすい組み合わせ。その都度言葉にすれば問題なし。'],
      wonjin: ['怨嗔', '理由もなく寂しいのに、なぜか離れられない…愛憎相性に注意!違いを認めるのがポイント。'],
      chung: ['冲', 'ぶつかると火花が散る。でもお互いをガラッと変える強烈な縁でもある。'],
    },
    TEN_INFO: {
      비견: '友達みたいな恋人。気楽で対等だけど、ときめきは自分たちで作らないと。',
      겁재: '刺激をくれるライバル型。一緒にいると負けず嫌いがON 🔥',
      식신: 'つい世話を焼きたくなる人。おいしいものを食べさせたくなる 🍰',
      상관: 'じゃれ合いの名コンビ。口ゲンカもデートみたいに楽しい 😝',
      편재: 'ときめき担当。自由でイベントみたいな恋 🎢',
      정재: '現実的で安定したパートナー。長続きする恋の予感 🏡',
      편관: '強烈に惹かれる人。引力MAX、でも駆け引き疲れに注意 ⚡',
      정관: '頼もしくてきちんとした人。自慢したくなる恋人 🎖️',
      편인: '独特なあなたを理解してくれる人。会話が深まる仲 🔭',
      정인: '無条件であなたの味方。一緒にいると安心する人 🫶',
    },
    PAIRS: [['外向', '人と会って充電', '内向', 'ひとりで充電'], ['感覚', '現実・経験派', '直観', '想像・可能性派'], ['思考', '事実が大事', '感情', '気持ちが大事'], ['判断', '計画を立てる派', '知覚', '即興が楽な派']],
    SP_CATS: ['恋愛', '進路・勉強', '人間関係', 'お金'],
    SP_POS: ['過去', '現在', '未来'],
    VERDICT: {
      go: { t: 'GOサイン 🟢', d: '流れはあなたの味方。迷っていたことなら、今動いても大丈夫。' },
      wait: { t: 'ちょっと待機 🟡', d: '方向は合ってるけど、タイミングをもう少し見て。準備するほど有利に。' },
      turn: { t: '方向転換 🔴', d: '今のやり方のままだとかなり大変かも。アプローチを変えてみて。' },
    },
    SP_ACTION: {
      love: { go: '勇気を出して先に話しかけよう。短く軽く!', wait: '返信の間隔より自分の毎日に集中', turn: 'この関係で本当に望んでいることを先に整理しよう' },
      career: { go: '後回しにしていた応募・挑戦を今週中に実行', wait: '情報をもっと集めよう。先輩や現役の人に聞いてみて', turn: '目標を一段下げて、小さく再スタート' },
      people: { go: '感謝している人に先に連絡してみよう', wait: '誤解があるなら気持ちが落ち着いてから話そう', turn: '疲れる関係とは少し距離を置こう' },
      money: { go: '計画した買い物・貯金は実行OK、ただし予算内で', wait: '大きな出費は2週間延期して家計簿をつけてみて', turn: 'まずサブスクの整理から!漏れるお金をストップ' },
    },
    MT_REL: ['気になる人·恋人 PRO', '友達', '同僚'],
    SAJU_MATCH: [
      { t: '似た者どうし', d: '同じ五行だから言わなくても通じ合う。でも、ふたりとも意地を張ると一歩も引かないかも。' },
      { t: '私が世話をする関係', d: 'あなたの気が相手を育てる流れ。尽くすのは楽しいけど、与えるばかりで疲れないように。' },
      { t: '私がリードする関係', d: 'あなたの気が相手を動かす構造で、主導権は自然とあなたに。先に相手の意見を聞くと相性UP。' },
      { t: '私を磨いてくれる関係', d: '相手があなたを鍛える構造。小言に感じても、結局あなたを成長させてくれる人。' },
      { t: '私を満たしてくれる関係', d: '相手の気があなたを元気にする流れ。一緒にいると楽で充電される感じ!' },
    ],
    MT_TIP: {
      lover: ['違いがむしろ魅力に。相手のMBTIっぽい話し方を一度試してみて 💬', '相性十分!先に連絡すると反応いい確率高め 💌'],
      friend: ['好みは違っても、お互いに新しい世界を見せ合える友達 🌏', '一生の友達の予感。一緒に旅行してみて ✈️'],
      work: ['仕事のスタイルが違うかも。役割と締め切りを先にすり合わせて 📋', '一緒にプロジェクトをやると相乗効果抜群。役割分担だけはっきりと! 🚀'],
    },
    SCORE_CATS: ['恋愛', '仕事・勉強', '金運', 'コンディション'],
    STAMPS_UP: ['LUCKY! 🍀', 'むしろ最高 👍', 'いっちゃえ 🔥', '超ラッキー ✨', 'WOW!', '運気やばい ⚡'],
    STAMPS_REV: ['大丈夫だよ 🫶', 'どんでん返し注意 🙃', 'ひと呼吸 🫧', '休んでもOK ☁️'],
    TAROT: [
      ['愚者', '新しい始まり · 自由', '無謀 · 準備不足', '新しく始めるのにいいタイミング。完璧な計画より、まず行動が得。', 'ワクワクした気持ちのままでいいよ。今日のあなたは思ってるより勇敢 ✨', '衝動的な決断は損につながるかも。支払いの前に10秒だけ考えて。', '焦ってもいいよ。ひと呼吸おいても絶対に遅れないから。'],
      ['魔術師', '能力 · 実行力', '見栄 · 小細工', '必要な材料はもう揃ってる。今日始めたことはうまくいく。', 'あなたにはもう十分な力がある。自分を信じて 🔮', '口だけだと信頼を失う。見せられることだけ約束しよう。', '無理によく見せなくていい。ありのままがいちばん素敵。'],
      ['女教皇', '直感 · 秘密', '混乱 · 隠しごと', 'まだ情報が出そろってない。決断は保留して観察するのが正解。', '心の小さな声がきっと正しい。直感を信じて 🌙', '感情と事実が混ざって判断がにごりがち。まず事実を整理して。', 'ひとりで抱えこまないで、信頼できる人に話してもいいよ。'],
      ['女帝', '豊かさ · 魅力', '過剰 · 依存', '投資した分だけ返ってくる日。自分と自分の空間にかけるお金は価値あり。', '今日のあなた、本当に輝いてる。自分を大切にする一日を 🌸', '使いすぎ・食べすぎ注意。気分転換の買い物はカートに入れるだけで。', '人の世話ばかりで自分を忘れてない? 今日はあなたが先。'],
      ['皇帝', 'リーダーシップ · 秩序', '頑固 · 支配', '主導権を握るとうまく回る。予定と役割をはっきりさせよう。', 'あなたが真ん中にいると、みんな安心できる 👑', '自分のやり方だけにこだわると衝突する。別の方法も聞いてみて。', '全部ひとりで背負わなくていい。肩の力を抜こう。'],
      ['教皇', 'アドバイス · 学び', '固定観念 · 反発', '実績のある方法がいちばん速い。先輩や専門家に相談して。', '信頼できる人のひとことが大きな支えになるよ。', 'みんなと同じやり方があなたに合うとは限らない。基準を見直して。', '決まった道を行かなくても大丈夫。あなたのやり方も正解。'],
      ['恋人', '恋愛 · 選択', '葛藤 · 迷い', '大事な選択の日。メリット・デメリットを書き出すと答えが見える。', '心が惹かれるほうが正解の確率高め 💞 ときめき注意報!', '言えなかった不満がたまってる。誤解は早めに解こう。', '揺れる気持ちも自然なこと。ゆっくり本音を見つめて。'],
      ['戦車', '突破 · 勝利', '暴走 · 迷走', '押せば勝てる日。目標をひとつに絞ってまっすぐ進んで。', 'その勢いのまま! 今日は止まらないで 🏁', 'スピードより方向。今の道が合ってるかまず確認して。', '走りすぎて疲れたなら、少し止まってもいいんだよ。'],
      ['力', '勇気 · 忍耐', '自信低下 · 敏感', 'やさしく説得するほうが勝つ。感情コントロールが今日の武器。', 'あなたは思ってるより強い人。今日もよく頑張ってる 🦁', '疲れると敏感になる。大事な話は調子のいい時間に。', '弱くなる日もあるよ。自分を責めないで。'],
      ['隠者', '内省 · ひとり時間', '孤立 · さみしさ', 'ひとりで集中すると効率最高。通知を切って深く集中しよう。', '今日は自分だけの洞窟で充電してもいい 🏮 それも必要。', '隠れすぎるとチャンスも逃す。ひとりだけでも連絡してみて。', 'さみしいなら隠さずに、誰かに頼ってみて。'],
      ['運命の輪', '転機 · 幸運', 'タイミングのズレ', '流れが変わるとき。来たチャンスはまずつかんでおこう。', 'いいことが巡り巡ってあなたのところに来てる 🍀', '今日はタイミングが少しずれ気味。大きな決断は数日あとに。', 'うまくいかない日も過ぎていく。もうすぐあなたの番。'],
      ['正義', '公正 · 決断', '不公平 · 偏り', '客観的に判断すれば損しない。契約や書類はていねいに確認を。', 'あなたの努力は正直に返ってくる ⚖️', '片方の話だけで判断しないで。理不尽なことには証拠を残そう。', '自分に厳しすぎる物差しを当ててない?'],
      ['吊るされた男', '視点の転換 · 待つ', '停滞 · 犠牲', '今は待つのが作戦。別の角度から見ると答えが見える。', '止まっているようでも、あなたは成長中 🌱', '意味のない待ちはもうおしまい。整理するものは整理しよう。', '人のために我慢してばかりじゃなく、あなたの気持ちも言って。'],
      ['死神', '終わりと新しい始まり', '変化への抵抗', '終わらせるものを終わらせてこそ新しく始まる。後回しの片づけを今日やろう。', '怖そうに見えて、じつは蝶になるカード 🦋 変化は成長。', '慣れたものにしがみつくと足踏み。小さな変化から始めて。', '手放すのがつらい気持ち、よくわかる。ゆっくりでいいよ。'],
      ['節制', 'バランス · 調和', 'アンバランス · やりすぎ', 'ほどほどが正解。仕事と休みのバランスを整えるだけで効率UP。', '心が落ち着く日。自分のペースを守って 🧘', '片寄ってるかも。まず睡眠と食事のリズムをチェック。', '頑張りすぎてる。少しゆるんでも大丈夫。'],
      ['悪魔', '誘惑 · 執着', '解放 · 断ち切る', 'ドーパミンの誘惑に注意。ショート動画・夜食・衝動買いのどれかひとつだけ我慢してみて。', '惹かれるのは自然だけど、あなたを苦しめるものは手放していい。', '悪い習慣を断つのにいい日。今決めれば成功率高め。', 'しばられていた何かから、やっと抜け出しつつある 🔓'],
      ['塔', '急変 · 気づき', '危機回避', '予想外のことが起きるかも。プランBを準備しておこう。', '揺れても崩れない。むしろもっと強くなれる ⚡', '危機は避けたけど根本の原因は残ってる。点検が必要。', '危なかったけど大丈夫。驚いた心をまず落ち着けて。'],
      ['星', '希望 · ひらめき', '失望 · 自信低下', '長期目標を立てるのにいい日。ウィッシュリストを具体的な計画に。', 'あなたの夢はキラキラ叶いつつある ⭐ 信じ続けて。', '期待しすぎると失望も大きい。目標を小さく分けよう。', '光が見えなくても星はそこにある。あなたもそう。'],
      ['月', '不安 · 無意識', '誤解が解ける', 'あいまいな情報が多い日。確かめてないうわさはスルー。', 'なんとなく不安になるかも。でもそれは本当じゃない 🌕', 'ぼんやりしていた状況がはっきりする。真実が見えるタイミング。', '心配してたこと、思ったより大したことなかったとわかるはず。'],
      ['太陽', '成功 · 喜び', '一時的なくもり', '運気最高。後回しにしてたことを今日片づけると結果◎。', '今日は完全にラッキーデー ☀️ 思いきり笑って楽しんで!', 'いい流れだけど油断は禁物。細かいところをもう一度チェック。', '少し雲がかかっただけ。あなたの日差しはそのまま。'],
      ['審判', '復活 · 決断', '後悔 · 自己批判', '過去の努力が評価される日。もう一度挑戦するのにいいタイミング。', 'やり直してもいいんだよ。今度はもっとうまくいく 📯', '昔の失敗を何度も思い出すのはおしまい。教訓だけ持って進もう。', '自分を追いつめないで。十分よくやってきたよ。'],
      ['世界', '完成 · 達成', '詰めの甘さ', 'ひとつのサイクルが完成。成果をまとめて次のレベルへ。', 'ここまで来たあなた、本当にすごい 🌍 自分をほめてあげて。', '終わりが見えてるのに仕上げが惜しい。最後の10%に集中。', 'あと少し。もうほとんど着いてるよ!'],
    ],
  },
};

/* app.js의 데이터에 덮어쓰기 (app.js가 BOOT 직전에 호출) */
window.applyContentI18n = function () {
  const lang = window.soulLang; const C = window.SOUL_CONTENT[lang];
  if (!C) return;
  /* eslint-disable no-undef */
  const ALT = { en: ['tree', 'flame', 'soil', 'steel', 'sea'], ja: ['き', 'ひ', 'つち', 'かね', 'みず'] }[lang];
  try { C.EL.forEach((e, i) => { const { name, ...rest } = e; Object.assign(EL[i], rest, { ko: name, name: ALT[i] }); }); } catch (e) { /* 아직 정의 전 */ }
  try { C.STEM_INFO.forEach((e, i) => Object.assign(STEM_INFO[i], e)); } catch (e) { /* 아직 정의 전 */ }
  try { Object.keys(C.MBTI).forEach((k) => Object.assign(MBTI[k], C.MBTI[k])); } catch (e) { /* 아직 정의 전 */ }
  try { Object.assign(SYNERGY, C.SYNERGY); } catch (e) { /* 아직 정의 전 */ }
  try { C.RELATION.forEach((e, i) => Object.assign(RELATION[i], e)); } catch (e) { /* 아직 정의 전 */ }
  try { Object.keys(C.TG_THEME).forEach((k) => Object.assign(TG_THEME[k], C.TG_THEME[k])); } catch (e) { /* 아직 정의 전 */ }
  try { Object.assign(TTI_YEAR, C.TTI_YEAR); } catch (e) { /* 아직 정의 전 */ }
  try { C.SKINS.forEach((n, i) => { SKINS[i].n = n; }); } catch (e) { /* 아직 정의 전 */ }
  try { Object.keys(C.BR_REL).forEach((k) => { BR_REL[k].n = C.BR_REL[k][0]; BR_REL[k].d = C.BR_REL[k][1]; }); } catch (e) { /* 아직 정의 전 */ }
  try { Object.keys(C.TEN_INFO).forEach((k) => { TEN_INFO[k].d = C.TEN_INFO[k]; }); } catch (e) { /* 아직 정의 전 */ }
  try { C.PAIRS.forEach((t, i) => { const r = PAIRS[i]; r[1] = t[0]; r[2] = t[1]; r[4] = t[2]; r[5] = t[3]; }); } catch (e) { /* 아직 정의 전 */ }
  try { C.SP_CATS.forEach((n, i) => { SP_CATS[i].n = n; }); } catch (e) { /* 아직 정의 전 */ }
  try { C.SP_POS.forEach((n, i) => { SP_POS[i].k = n; }); } catch (e) { /* 아직 정의 전 */ }
  try { Object.keys(C.VERDICT).forEach((k) => Object.assign(VERDICT[k], C.VERDICT[k])); } catch (e) { /* 아직 정의 전 */ }
  try { Object.assign(SP_ACTION, C.SP_ACTION); } catch (e) { /* 아직 정의 전 */ }
  try { C.MT_REL.forEach((n, i) => { MT_REL[i].n = n; }); } catch (e) { /* 아직 정의 전 */ }
  try { C.SAJU_MATCH.forEach((e, i) => Object.assign(SAJU_MATCH[i], e)); } catch (e) { /* 아직 정의 전 */ }
  try { Object.assign(MT_TIP, C.MT_TIP); } catch (e) { /* 아직 정의 전 */ }
  try { C.SCORE_CATS.forEach((n, i) => { SCORE_CATS[i][1] = n; }); } catch (e) { /* 아직 정의 전 */ }
  try { STAMPS_UP.splice(0, STAMPS_UP.length, ...C.STAMPS_UP); } catch (e) { /* 아직 정의 전 */ }
  try { STAMPS_REV.splice(0, STAMPS_REV.length, ...C.STAMPS_REV); } catch (e) { /* 아직 정의 전 */ }
  try { C.TAROT.forEach((t, i) => { const r = TAROT[i]; r[0] = t[0]; r[3] = t[1]; r[4] = t[2]; r[5] = t[3]; r[6] = t[4]; r[7] = t[5]; r[8] = t[6]; }); } catch (e) { /* 아직 정의 전 */ }
};
