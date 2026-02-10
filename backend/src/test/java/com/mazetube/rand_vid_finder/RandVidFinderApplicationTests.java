package com.mazetube.rand_vid_finder;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class RandVidFinderApplicationTests {

	@Test
	void contextLoads() {
	}
	@Test
	void testWordBank(){
		String words = WordBank.getRandomNouns();
		assertNotNull(words);
}

}
