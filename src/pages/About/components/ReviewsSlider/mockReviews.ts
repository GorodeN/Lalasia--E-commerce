export type Review = {
  author: string;
  text: string;
  avatarUrl?: string;
};

export const reviews = [
  {
    author: 'John Doe',
    text: 'This company provided exceptional service and I couldn’t be happier with the product quality!',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    author: 'Jane Smith',
    text: 'Quick delivery and top-notch customer support. Highly recommended!',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    author: 'Alex Johnson',
    text: 'Great selection and intuitive website. I always find what I need.',
    avatarUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    author: 'Emily Davis',
    text: 'High-quality products at competitive prices. Will shop here again!',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    author: 'Michael Brown',
    text: 'Five stars for the seamless shopping experience and fast shipping!',
    avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
];
