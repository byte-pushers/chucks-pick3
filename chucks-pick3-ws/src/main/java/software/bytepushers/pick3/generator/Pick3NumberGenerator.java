package software.bytepushers.pick3.generator;

import java.util.*;

/**
 * Class based on a naive understanding of how the Pick 3 Lottery is scored. The payout for the "sum it up" feature
 * is scaled based on the odds.
 */
public class Pick3NumberGenerator {

    private static class Play {
        public Play(int digits, int digitSum) {
            this.digits = digits;
            this.digitSum = digitSum;
        }
        int digits;
        int digitSum;

        public String toString() {
            return String.format("%03d", digits) + "  sum = " + digitSum;
        }
    }

    List<List<Play>> playsInOrderOfWinChance;

    public int[] generateNumbers(int numToPlay) {
        lazyInit();

        return null;
    }

    void lazyInit() {
        if (playsInOrderOfWinChance != null) return;

        Play[] plays = new Play[1000];
        for (int i = 0; i < 1000; ++i) {
            int digitSum = digitSum(i);
            plays[i] = new Play(i,digitSum);
        }

        HashMap<Integer, List<Play>> sumCounter = new HashMap<>();
        for (Play play : plays) {
            sumCounter.computeIfAbsent(play.digitSum, k -> new ArrayList<>()).add(play);
        }

        Comparator<Pair<Integer, List<Play>>> comp = Comparator.comparing(Pair::getFirst);
        comp = comp.reversed();
        PriorityQueue<Pair<Integer, List<Play>>> sumsSortedByOccurrence = new PriorityQueue<>(comp);

        for (Map.Entry<Integer,List<Play>> e : sumCounter.entrySet()) {
            sumsSortedByOccurrence.add(new Pair<>(e.getValue().size(), e.getValue()));
        }

        Pair<Integer,List<Play>> next;

        playsInOrderOfWinChance = new LinkedList<>();
        while((next = sumsSortedByOccurrence.poll()) != null) {
            List<Play> toAdd = next.second;
            toAdd.addAll(sumsSortedByOccurrence.poll().second);
            playsInOrderOfWinChance.add(toAdd);
        }
    }

    public int digitSum(int i) {
        return (i/100) + ((i % 100) / 10) + (i % 10);
    }

    private static class Pair<U,V> {
        U first;
        V second;

        public U getFirst() { return first; }
        public V getSecond() { return second; }

        public Pair(U first, V second) {
            this.first = first;
            this.second = second;
        }
    }

    public static void main(String[] args) {
        Pick3NumberGenerator p = new Pick3NumberGenerator();

        p.lazyInit();

        for (List<Play> list : p.playsInOrderOfWinChance) {
            System.out.println(list.size() + "  " + Arrays.deepToString(list.toArray()));
        }
    }
}
