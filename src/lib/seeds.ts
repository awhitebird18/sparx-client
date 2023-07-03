import { Message } from '@/features/messages';
import { User } from '@/features/users';
import { Space } from '@/features/spaces';
import dayjs from 'dayjs';

export const users: User[] = [
  {
    uuid: 'c33a163f-973d-49ab-a00f-ed3ada29f8c0',
    displayName: 'John Doe',
    image: '/images/profile-image-1.png',
    email: 'john.doe@example.com',
    status: 'online',
    timezone: 'America/New_York',
    admin: true,
  },
  {
    uuid: '3f73ec13-cb74-49c6-846c-030fb30406d8',
    displayName: 'Jane Smith',
    image: '/images/profile-image-2.png',
    email: 'jane.smith@example.com',
    status: 'offline',
    timezone: 'America/Los_Angeles',
    admin: false,
  },
  {
    uuid: 'f96fcd21-12bd-464d-b0bb-8d0084c1d443',
    displayName: 'Bob Johnson',
    image: '/images/profile-image-3.png',
    email: 'bob.johnson@example.com',
    status: 'online',
    timezone: 'Europe/London',
    admin: false,
  },
  {
    uuid: '5230ffab-c9e7-4851-82f0-c27c1c80f4bf',
    displayName: 'Alice Williams',
    image: '/images/profile-image-4.png',
    email: 'alice.williams@example.com',
    status: 'offline',
    timezone: 'Asia/Tokyo',
    admin: false,
  },
  {
    uuid: 'b2061c38-8563-455d-9d69-c300cadd4aeb',
    displayName: 'Charlie Brown',
    image: '/images/profile-image-5.png',
    email: 'charlie.brown@example.com',
    status: 'online',
    timezone: 'America/Chicago',
    admin: false,
  },
  {
    uuid: '316195f6-fb0e-4a2b-8f43-f079788068e2',
    displayName: 'Dorothy Gale',
    image: '/images/profile-image-6.png',
    email: 'dorothy.gale@example.com',
    status: 'offline',
    timezone: 'America/Denver',
    admin: true,
  },
  {
    uuid: 'df8de1d0-e52a-4eca-b98f-6a1d5ede6900',
    displayName: 'Elvis Presley',
    image: '/images/profile-image-7.png',
    email: 'elvis.presley@example.com',
    status: 'online',
    timezone: 'America/Los_Angeles',
    admin: false,
  },
];

export const messages: Message[] = [
  {
    uuid: '1',
    content: 'Hello, how is everyone doing today?',
    userId: 'c33a163f-973d-49ab-a00f-ed3ada29f8c0',
    timezone: 'America/New_York',
    createdAt: dayjs('2023-07-01T08:00:00.000Z'),
  },
  {
    uuid: '2',
    content: 'Hey John, I am doing well, thanks!',
    userId: '3f73ec13-cb74-49c6-846c-030fb30406d8',
    timezone: 'America/Los_Angeles',
    createdAt: dayjs('2023-07-01T08:05:00.000Z'),
  },
  {
    uuid: '3',
    content: 'That is great to hear, Jane. I was just working on the project plan.',
    userId: 'c33a163f-973d-49ab-a00f-ed3ada29f8c0',
    timezone: 'America/New_York',
    createdAt: dayjs('2023-07-01T08:10:00.000Z'),
  },
  {
    uuid: '4',
    content: 'I just finished my tasks for the day!',
    userId: 'f96fcd21-12bd-464d-b0bb-8d0084c1d443',
    timezone: 'Europe/London',
    createdAt: dayjs('2023-07-01T08:15:00.000Z'),
  },
  {
    uuid: '5',
    content: 'That is excellent, Bob! You are really quick.',
    userId: '5230ffab-c9e7-4851-82f0-c27c1c80f4bf',
    timezone: 'Asia/Tokyo',
    createdAt: dayjs('2023-07-01T08:20:00.000Z'),
  },
  {
    uuid: '50',
    content: 'Another message!!',
    userId: '5230ffab-c9e7-4851-82f0-c27c1c80f4bf',
    timezone: 'Asia/Tokyo',
    createdAt: dayjs('2023-07-01T08:20:00.000Z'),
  },
  {
    uuid: '6',
    content: 'Thanks, Alice. I try to be efficient.',
    userId: 'f96fcd21-12bd-464d-b0bb-8d0084c1d443',
    timezone: 'Europe/London',
    createdAt: dayjs('2023-07-01T08:30:00.000Z'),
  },
  {
    uuid: '7',
    content: "Hey, guys. What's the plan for today's meeting?",
    userId: 'b2061c38-8563-455d-9d69-c300cadd4aeb',
    timezone: 'America/Chicago',
    createdAt: dayjs('2023-07-01T09:00:00.000Z'),
  },
  {
    uuid: '8',
    content: 'Hi Charlie, we will be discussing the progress of the project.',
    userId: '316195f6-fb0e-4a2b-8f43-f079788068e2',
    timezone: 'America/Denver',
    createdAt: dayjs('2023-07-01T09:30:00.000Z'),
  },
  {
    uuid: '20',
    content: "That sounds great, let's wrap it up for today!",
    userId: 'df8de1d0-e52a-4eca-b98f-6a1d5ede6900',
    timezone: 'America/Los_Angeles',
    createdAt: dayjs('2023-07-02T18:00:00.000Z'),
  },
];

export const spaces: Space[] = [
  {
    uuid: 'c0277c38-9493-4975-a60b-f66f02a7b18e',
    name: 'Research and Development',
    image: '/images/space-1.png',
  },
  {
    uuid: '997e11d5-91d3-442a-bc20-5fdbabaaf39d',
    name: 'Customer Service',
    image: '/images/space-2.png',
  },
  {
    uuid: '67b3ffe0-11f4-4be1-8e29-a122c7ac494c',
    name: 'Implementation',
    image: '/images/space-3.png',
  },
];
