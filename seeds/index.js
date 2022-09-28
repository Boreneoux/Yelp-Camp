const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', () => {
    console.log('Database connected!');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6305dd8249947063dac4fbf8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae a explicabo necessitatibus laboriosam ea quisquam modi pariatur. Nemo repellat ducimus error exercitationem! Fugit voluptatibus ipsum amet, ab blanditiis ex velit. Corporis saepe assumenda exercitationem incidunt inventore ipsa eveniet itaque distinctio deserunt in aperiam fugit at, nesciunt natus eaque qui minima, ut aliquid ad eius ab animi eos? Velit, at maiores.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/n0xus/image/upload/v1661444658/YelpCamp/pbzbxazhgfwtbvlbyoir.jpg',
                    filename: 'YelpCamp/pbzbxazhgfwtbvlbyoir',
                },
                {
                    url: 'https://res.cloudinary.com/n0xus/image/upload/v1661444658/YelpCamp/zsfjkwi7lqunrpapz9e6.jpg',
                    filename: 'YelpCamp/zsfjkwi7lqunrpapz9e6',
                },
            ],
        });
        await camp.save();
    }
};

seedDB();
