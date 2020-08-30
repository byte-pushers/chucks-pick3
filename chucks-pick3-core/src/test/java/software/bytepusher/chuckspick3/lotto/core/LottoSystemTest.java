package software.bytepusher.chuckspick3.lotto.core;

import org.junit.Assert;
import org.junit.Test;
import software.bytepushers.chuckspick3.lotto.core.LottoSystem;

public class LottoSystemTest {

    @Test
    public void processNumberTest() {
        int[][] picksNumber = LottoSystem.processNumber(25);
        Assert.assertNotNull("Processing numbers never should be null", picksNumber);
        Assert.assertTrue("Processing numbers response must have members", picksNumber.length > 0);
        Assert.assertTrue("Processing numbers must be responded in size of 20 to 50 range",
                picksNumber.length > 20 && picksNumber.length < 50);
        for (int[] members : picksNumber) {
            Assert.assertEquals("Every member must have 3 digits", 3, members.length);
            for (int number : members) {
                Assert.assertTrue("Every number must be from 0 and 9 range", number > -1 && number < 10);
            }
        }
    }

}
