import { mongoose } from "mongoose";
import { faker } from "faker";


const EventSchema = new mongoose.Schema({
  eventName: String,
  description: String,
  eventLocation: {
    streetAddress: String,
    city: String,
    state: String,
    zip: String,
  },
  contactEmail: String,
  maxCapacity: Number,
  priceOfAdmission: Number,
  eventDate: String,
  startTime: String,
  endTime: String,
  publicEvent: Boolean,
  attendees: [
    {
      firstName: String,
      lastName: String,
      emailAddress: String,
    },
  ],
  totalNumberOfAttendees: Number,
});

const Event = mongoose.model("Event", EventSchema);

mongoose.connect("mongodb://localhost:27017/Jinghao_Huang_lab6", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedDB() {
  // 清除现有数据
  await Event.deleteMany({});

  // 生成新的数据
  for (let i = 0; i < 10; i++) {
    // 生成10个事件作为示例
    const attendees = [];
    for (let j = 0; j < 5; j++) {
      // 每个事件有5名参与者
      attendees.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        emailAddress: faker.internet.email(),
      });
    }

    const event = new Event({
      eventName: faker.company.companyName(),
      description: faker.lorem.sentence(),
      eventLocation: {
        streetAddress: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
      },
      contactEmail: faker.internet.email(),
      maxCapacity: faker.random.number({ min: 10, max: 50 }),
      priceOfAdmission: faker.random.number({ min: 0, max: 100 }),
      eventDate: faker.date.future(),
      startTime: faker.random.number({ min: 1, max: 12 }) + ":00 AM",
      endTime: faker.random.number({ min: 1, max: 12 }) + ":00 PM",
      publicEvent: faker.random.boolean(),
      attendees: attendees,
      totalNumberOfAttendees: attendees.length,
    });

    await event.save();
  }

  console.log("Database seeded!");
  mongoose.connection.close();
}

seedDB();
