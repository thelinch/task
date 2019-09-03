import { Request, Response } from "express";
const fakeDatabase = []

export class SubcriptionController {
    setSubcription(req: Request) {
        const subscription = req.body
        console.log(subscription)
        fakeDatabase.push(subscription)
        console.log(fakeDatabase);
    }
}