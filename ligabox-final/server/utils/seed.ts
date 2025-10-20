import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import WeightClass from '../models/WeightClass';
import Fighter from '../models/Fighter';
import Fight from '../models/Fight';
import Event from '../models/Event';
import Article from '../models/Article';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ligabox';

const seedData = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      WeightClass.deleteMany({}),
      Fighter.deleteMany({}),
      Fight.deleteMany({}),
      Event.deleteMany({}),
      Article.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      email: 'admin@ligadeboxeo.com',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('Created admin user');

    // Create weight classes
    const weightClasses = await WeightClass.insertMany([
      { name: 'Heavyweight', weight_lbs: 200 },
      { name: 'Light Heavyweight', weight_lbs: 175 },
      { name: 'Middleweight', weight_lbs: 160 },
      { name: 'Welterweight', weight_lbs: 147 },
      { name: 'Lightweight', weight_lbs: 135 },
    ]);
    console.log('Created weight classes');

    // Create fighters
    const heavyweight = weightClasses[0];
    const fighters = await Fighter.insertMany([
      {
        firstName: 'Juan',
        lastName: 'Gonzalez',
        nickname: 'The Hammer',
        slug: 'juan-gonzalez',
        weightClass: heavyweight._id,
        status: 'champion',
        bio: 'Juan Gonzalez is a legendary heavyweight champion known for his devastating knockout power.',
        stats: { wins: 28, losses: 2, draws: 1, knockouts: 24 },
        physical: { height_cm: 188, reach_cm: 195, stance: 'orthodox' },
        media: {
          profileImage: 'https://cdn.ligadeboxeo.com/fighters/juan-gonzalez.jpg',
          heroImage: 'https://cdn.ligadeboxeo.com/fighters/juan-gonzalez-hero.jpg',
          gallery: [
            'https://cdn.ligadeboxeo.com/fighters/juan-gonzalez-1.jpg',
            'https://cdn.ligadeboxeo.com/fighters/juan-gonzalez-2.jpg',
          ],
        },
      },
      {
        firstName: 'Carlos',
        lastName: 'Rodriguez',
        nickname: 'The Cobra',
        slug: 'carlos-rodriguez',
        weightClass: heavyweight._id,
        status: 'active',
        bio: 'Carlos Rodriguez is a fierce competitor with lightning-fast reflexes.',
        stats: { wins: 25, losses: 3, draws: 0, knockouts: 20 },
        physical: { height_cm: 185, reach_cm: 192, stance: 'southpaw' },
        media: {
          profileImage: 'https://cdn.ligadeboxeo.com/fighters/carlos-rodriguez.jpg',
          heroImage: 'https://cdn.ligadeboxeo.com/fighters/carlos-rodriguez-hero.jpg',
          gallery: [],
        },
      },
      {
        firstName: 'Miguel',
        lastName: 'Silva',
        nickname: 'Iron Fist',
        slug: 'miguel-silva',
        weightClass: heavyweight._id,
        status: 'active',
        bio: 'Miguel Silva brings incredible power and technique to every fight.',
        stats: { wins: 22, losses: 4, draws: 1, knockouts: 18 },
        physical: { height_cm: 190, reach_cm: 197, stance: 'orthodox' },
        media: {
          profileImage: 'https://cdn.ligadeboxeo.com/fighters/miguel-silva.jpg',
          gallery: [],
        },
      },
    ]);
    console.log('Created fighters');

    // Create fights
    const fight1 = await Fight.create({
      fighters: [fighters[0]._id, fighters[1]._id],
      weightClass: 'Heavyweight',
      isTitleFight: true,
      rounds: 12,
      result: {
        winner: fighters[0]._id,
        method: 'UD',
        finalRound: 12,
      },
    });

    const fight2 = await Fight.create({
      fighters: [fighters[1]._id, fighters[2]._id],
      weightClass: 'Heavyweight',
      isTitleFight: false,
      rounds: 10,
    });
    console.log('Created fights');

    // Create event
    await Event.create({
      eventName: 'Championship Night 2025',
      slug: 'championship-night-2025',
      date: new Date('2025-11-15T20:00:00Z'),
      location: 'Madison Square Garden, New York',
      status: 'upcoming',
      ticketUrl: 'https://ticketmaster.com/championship-night-2025',
      streamUrl: 'https://youtube.com/live/championship-night-2025',
      fights: [fight1._id, fight2._id],
    });
    console.log('Created event');

    // Create articles
    await Article.insertMany([
      {
        title: 'Juan Gonzalez Retains Heavyweight Title',
        slug: 'juan-gonzalez-retains-heavyweight-title',
        author: 'Sports Journalist',
        content: 'In a thrilling match at Madison Square Garden, Juan Gonzalez successfully defended his heavyweight title against Carlos Rodriguez in a unanimous decision victory. The fight went the full 12 rounds with Gonzalez showcasing superior technique and power.',
        featuredImage: 'https://cdn.ligadeboxeo.com/articles/article-1.jpg',
        excerpt: 'In a thrilling match, Juan Gonzalez successfully defended his heavyweight title...',
        tags: ['boxing', 'heavyweight', 'championship'],
        status: 'published',
        publishedAt: new Date('2025-10-20T10:00:00Z'),
        relatedArticles: [],
      },
      {
        title: 'Pre-Fight Analysis: Gonzalez vs Rodriguez',
        slug: 'pre-fight-analysis-gonzalez-vs-rodriguez',
        author: 'Boxing Analyst',
        content: 'As we approach the highly anticipated showdown between Juan Gonzalez and Carlos Rodriguez, boxing experts weigh in on what to expect from this heavyweight title fight.',
        featuredImage: 'https://cdn.ligadeboxeo.com/articles/article-2.jpg',
        excerpt: 'Expert analysis of the upcoming heavyweight championship bout...',
        tags: ['boxing', 'heavyweight', 'analysis'],
        status: 'published',
        publishedAt: new Date('2025-10-15T08:00:00Z'),
        relatedArticles: [],
      },
      {
        title: 'Rising Stars: Fighters to Watch in 2025',
        slug: 'rising-stars-fighters-to-watch-2025',
        author: 'Editorial Team',
        content: 'The boxing world is buzzing with excitement about the next generation of fighters. Here are the top prospects making waves in Liga de Boxeo.',
        featuredImage: 'https://cdn.ligadeboxeo.com/articles/article-3.jpg',
        excerpt: 'Meet the up-and-coming fighters who could dominate the sport...',
        tags: ['boxing', 'prospects', '2025'],
        status: 'published',
        publishedAt: new Date('2025-10-10T12:00:00Z'),
        relatedArticles: [],
      },
    ]);
    console.log('Created articles');

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
