import { User } from '../models';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'admin@biomarket.hu',
    password: 'admin123', // In real app, this would be hashed
    firstName: 'Admin',
    lastName: 'Felhasználó',
    role: 'admin',
    phone: '+36 1 234 5678',
    address: {
      street: 'Bio utca 10.',
      city: 'Budapest',
      zipCode: '1234',
      country: 'Magyarország'
    },
    createdAt: new Date('2025-01-15')
  },
  {
    id: 2,
    email: 'kovacs.janos@example.com',
    password: 'user123',
    firstName: 'János',
    lastName: 'Kovács',
    role: 'user',
    phone: '+36 30 123 4567',
    address: {
      street: 'Fő utca 25.',
      city: 'Budapest',
      zipCode: '1011',
      country: 'Magyarország'
    },
    createdAt: new Date('2025-02-10')
  },
  {
    id: 3,
    email: 'nagy.eva@example.com',
    password: 'user123',
    firstName: 'Éva',
    lastName: 'Nagy',
    role: 'user',
    phone: '+36 70 987 6543',
    address: {
      street: 'Kossuth tér 12.',
      city: 'Debrecen',
      zipCode: '4024',
      country: 'Magyarország'
    },
    createdAt: new Date('2025-02-20')
  }
];

// Helper function to find user by email
export function findUserByEmail(email: string): User | undefined {
  return MOCK_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
}

// Helper function to validate credentials
export function validateCredentials(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
}
