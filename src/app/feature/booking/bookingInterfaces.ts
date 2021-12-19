export interface BookingState {
  status: 'idle' | 'loading' | 'failed';
  data: any;
}
