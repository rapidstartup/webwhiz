import React from 'react';
import { Box } from '@chakra-ui/react';
import { FreeComponent } from '../../components/Pricing/FreeComponent';
import { CurrentUser, User } from '../../services/appConfig';
import { DiscoutData } from '../../types/subscription.type';
import { PricingDiscounts } from '../../services/commonServices';


export const SettingsSubscription = () => {
    const [user, setUser] = React.useState<User>(CurrentUser.get());
    const [discountData, setDiscountData] = React.useState<DiscoutData>();

    React.useEffect(() => {
        async function fetchData() {
            try {
                const url = window.location.href;
                const response = await getPricingDiscounts(url);
                let data = response.data
                if (!data.discountPercentage) {
                    data = {
                        message: 'no discount avaialble',
                        discountPercentage: '0',
                    } as PricingDiscounts;
                }
                const discountPercentage = parseFloat(data.discountPercentage);
                setDiscountData({
                    couponCode: data.couponCode,
                    discountPercentage,
                    countryFlag: data.countryFlag,
                    country: data.country
                });
            } catch (error) {
                console.log("Unable to fetch pricing details", error);
            } finally {
            }
        }
        fetchData();
    }, []);

    return (
        <Box minW="1088px" p={8} pt={12} pb={1} backgroundColor="white" boxShadow="sm" borderRadius="md">
            <FreeComponent
                currentSubscription={user.subscriptionData}
                discountData={discountData}
                userEmail={user.email}
            />
        </Box>
    );
}
