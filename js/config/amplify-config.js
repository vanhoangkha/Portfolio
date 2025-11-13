import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

// Configure Amplify
Amplify.configure(outputs, {
  ssr: false
});

console.log('✅ Amplify configured successfully');

export default Amplify;
