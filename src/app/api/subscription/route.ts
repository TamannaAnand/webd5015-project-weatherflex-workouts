import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prismaDB';

export async function POST(req: Request) {
    try {
        const { email, subscriptionStatus } = await req.json();
        
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }
        
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { subscriptionStatus },
        });

        return NextResponse.json({ 
            message: 'Subscription status updated successfully', 
            user: updatedUser 
        });
    } catch (error) {
        console.error('Error updating subscription:', error);
        return NextResponse.json(
            { error: 'Failed to update subscription status' },
            { status: 500 }
        );
    }
}