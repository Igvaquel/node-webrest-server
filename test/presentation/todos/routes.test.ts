import request from 'supertest'
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres';
// import '@testing-library/jest-dom/jest-globals';
// import '@testing-library/jest-dom';

describe( 'Todo route testing', () => {
    
    beforeAll( async() => {
        await testServer.start();
    });
    
    beforeEach( async() => {
        await prisma.todo.deleteMany();
    })

    afterAll( () => {
        testServer.close();
    });

    const todo1 = { text: 'texto1' }
    const todo2 = { text: 'texto2' }



    test('should return todos api/todos', async() => {

        await prisma.todo.createMany({
            data: [ todo1, todo2 ]
        });

        const {body} = await request(testServer.app)
         .get('/api/todos')
         .expect(200)

        expect( body ).toBeInstanceOf( Array );
        expect( body.length ).toBe( 2 );
        expect( body[0].text ).toBe( todo1.text );
        expect( body[1].text ).toBe( todo2.text );

    })

    test('should return a todo api/todos/:id', async() => {

        const todo = {
            id: 1,
            text: 'text',
            completedAt: null 
        }
        
    })
})

function beforeAll(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}


function afterAll(arg0: () => void) {
    throw new Error('Function not implemented.');
}


function expect(body: any) {
    throw new Error('Function not implemented.');
}
