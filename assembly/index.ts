import { Context, PersistentVector } from "near-sdk-as";
import { Feedback } from "./feedback";

@nearBindgen
export class Contract {
  feedbackList: PersistentVector<Feedback> = new PersistentVector< Feedback>("w");

  @mutateState()
  givefeedback(message: string, toWho: string):  Feedback {
    let sender: string = Context.sender;

    let feedback:  Feedback = new  Feedback(message, sender, toWho);
    this.feedbackList.push(feedback);
    return feedback;
  }

  listfeedbacks(): Array< Feedback> {
    let feedbacks = new Array< Feedback>(this.feedbackList.length);
    for (let i = 0; i < this.feedbackList.length; i++) {
      feedbacks[i] = this.feedbackList[i];
    }
    return feedbacks;
  }
}
