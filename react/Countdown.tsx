//import React from 'react'
import { useCssHandles } from "vtex.css-handles"
import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick } from './utils/time'



import { useQuery } from 'react-apollo'

// @ts-ignore
import useProduct from 'vtex.product-context/useProduct'
import productReleaseDate from './queries/productReleaseDate.graphql'

//import { FormattedMessage } from 'react-intl'


interface CountdownProps {
  //title: string
  targetDate: string
};


const DEFAULT_TARGET_DATE = (new Date('2020-06-25')).toISOString()

//const CSS_HANDLES = ["container", "countdown", "title"]
const CSS_HANDLES = ['countdown'];

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ 

 }) => {
  const [
    timeRemaining,
    setTime
    ] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const productContext = useProduct();
  const product = productContext?.product;
  const linkText = product?.linkText;
  const { data, loading, error } = useQuery(productReleaseDate, { 
   variables: { 
     slug: linkText 
   }, 
   ssr: false,
   skip: !linkText, 
});
const handles = useCssHandles(CSS_HANDLES);
  tick(data?.product?.releaseDate || DEFAULT_TARGET_DATE, setTime);
  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  };
  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    );
  };

 //</span> const titleText = title || <FormattedMessage id="countdown.title" />
 // const handles = useCssHandles(CSS_HANDLES)

  tick(data?.product?.releaseDate || DEFAULT_TARGET_DATE, setTime);

  return (
    //<div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
    //<div className={`${handles.title} db tc`}>{titleText}</div>
    <div className={`${handles.countdown} t-heading-2 fw3 w-100 c-muted-1 db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
 // </div>
  );
};

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
  //  title: {
  //  title: 'I am a title',
  //  type: 'string',
  //  default: null,
  //},
    targetDate: {
      title: 'Final date',
      description: 'Final date used in the countdown',
      type: 'string',
      default: null,
    }
  }
};

export default Countdown
