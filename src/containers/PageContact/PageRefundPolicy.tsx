import Helmet from 'react-helmet'
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";


const PageRefundPolicy = () => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative`}
      data-nc-id='PageAbout'
    >
      <Helmet>
        <title>Refund Policy | TicketsForTravel</title>
      </Helmet>

      <BgGlassmorphism />

      <div className='container py-16 lg:py-28 space-y-16 lg:space-y-28'>
        <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
          Return and Refund Policy
        </h2>

        <div className='block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1'>
          <p>
            Last updated: June 08, 2021

            Thank you for shopping at Tickets4Travel.

            If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.

            The following terms are applicable for any products that You purchased with Us. Interpretation and Definitions

            Interpretation

            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>


          <h3 className='text-xl font-semibold my-5'>Definitions</h3>

          <p className='my-3'>
            For the purposes of this Return and Refund Policy:

            Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Tickets4Travel, Ka-39/5, 4th floor C-5 KURIL Pragati Sarani Vatara, Dhaka, 1229.

            Services refer to the items offered for sale on the Service.

            Website refers to Tickets4Travel, accessible from https://tickets4travel.com/

            You mean the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
          </p>


          <h3 className='text-xl font-semibold my-5'>
            Your Order Cancellation Rights
          </h3>

          <p className='my-3'>
            You are entitled to cancel Your Order within 14 days without giving any reason for doing so.

            The deadline for cancelling an Order is 14 days from the date on which You received the Services or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.

            In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:

            By email: contact@tickets4travel.com

            By phone number: 09613-123365

            We will reimburse You no later than 14 days from the day on which We receive the returned Services. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.
          </p>

          <h3 className='text-xl font-semibold my-5'>
            Conditions for Returns
          </h3>

          <p className='my-3'>
            In order for the Services to be eligible for a return, please make sure that:

            The Services were purchased in the last 14 days

            The Services are in the original packaging

            The following Services cannot be returned:

            The supply of Services made to Your specifications or clearly personalized.

            The supply of Services which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.

            The supply of Services which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.

            The supply of Services which are, after delivery, according to their nature, inseparably mixed with other items.

            We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.

            Only regular priced Services may be refunded. Unfortunately, Services on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.
          </p>


          <h3 className='text-xl font-semibold my-5'>
            Returning Services
          </h3>

          <p className='my-3'>
            You are responsible for the cost and risk of returning the Services to Us. You should send the Services at the following address:

            Ka-39/5, 4th floor C-5 KURIL Pragati Sarani Vatara, Dhaka, 1229

            We cannot be held responsible for Services damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Services or proof of received return delivery.
          </p>


          <h3 className='text-xl font-semibold my-5'>
            Gifts
          </h3>

          <p className='my-3'>
            If the Services were marked as a gift when purchased and then shipped directly to you, You'll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.

            If the Services weren't marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the refund to the gift giver.
          </p>

          <h3 className='text-xl font-semibold my-5'>
            Contact Us
          </h3>

          <p className='my-3'>
            If you have any questions about our Returns and Refunds Policy, please contact us:

            By email: contact@tickets4travel.com

            By phone number: 09613-123365
          </p>

        </div>
      </div>
    </div>
  );
};

export default PageRefundPolicy;
