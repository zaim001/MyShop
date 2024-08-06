import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stripe, StripeCardElement, StripeElements, PaymentMethod, loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../../env/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    this.stripe = await loadStripe(environment.stripe.publicKey);
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card');
      this.cardElement.mount('#card-element');
    }
  }

  public getCardElement(): StripeCardElement | null {
    return this.cardElement;
  }

  public async createPaymentMethod(): Promise<PaymentMethod | null> {
    if (this.stripe && this.cardElement) {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.cardElement,
      });
      if (error) {
        console.error(error);
        return null;
      }
      return paymentMethod;
    }
    return null;
  }
}
